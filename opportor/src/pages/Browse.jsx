import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function Browse() {
  const [opportunities, setOpportunities] = useState([]);
  const [savedMap, setSavedMap] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [freeFilter, setFreeFilter] = useState("All");
  const getUrgency = (deadline) => {
    const today = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

    if (diff <= 3) return "🔥 Urgent";
    if (diff <= 7) return "⏳ Closing Soon";
    return "🟢 Open";
  };

  useEffect(() => {
    const fetchOpportunities = async () => {
      const querySnapshot = await getDocs(collection(db, "opportunities"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOpportunities(data);
    };

    fetchOpportunities();
  }, []);

  useEffect(() => {
    const fetchSaved = async () => {
      if (!auth.currentUser) return;

      const snapshot = await getDocs(collection(db, "savedOpportunities"));
      const saved = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();

        if (data.userId === auth.currentUser.uid) {
          saved[data.opportunityID] = true;
        }
      });
      setSavedMap(saved);
    };
    fetchSaved();
  }, [opportunities]);

  const handleToggleSave = async (opportunityID) => {
    if (!auth.currentUser) {
      alert("You must be logged in to save opportunties.");
      return;
    }

    const saveRef = doc(
      db,
      "savedOpportunities",
      `${auth.currentUser.uid}_${opportunityID}`,
    );

    try {
      if (savedMap[opportunityID]) {
        await deleteDoc(saveRef);

        setSavedMap((prev) => {
          const updated = { ...prev };
          delete updated[opportunityID];
          return updated;
        });
      } else {
        await setDoc(saveRef, {
          userId: auth.currentUser.uid,
          opportunityID: opportunityID,
          category: opportunities.find((o) => o.id === opportunityID)?.category,
        });

        setSavedMap((prev) => ({
          ...prev,
          [opportunityID]: true,
        }));
      }
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      (opp.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opp.description || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || opp.category === categoryFilter;

    const matchesLocation =
      locationFilter === "All" || opp.locationType === locationFilter;

    const matchesFree =
      freeFilter === "All" || String(opp.isFree) === freeFilter;

    const matchesGrade =
      gradeFilter === "All" ||
      (opp.gradeRange && opp.gradeRange.includes(Number(gradeFilter)));

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesFree &&
      matchesGrade
    );
  });

  return (
    <PageWrapper>
      <div className="page-container" style={{ padding: "2rem" }}>
        <h2>Browse Opportunities</h2>

        <div className="filter-container">
          <input
            type="text"
            placeholder="🔍 Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="filter-row">
            <select onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Program">Program</option>
              <option value="Competition">Competition</option>
            </select>

            <select onChange={(e) => setGradeFilter(e.target.value)}>
              <option value="All">All Grades</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>

            <select onChange={(e) => setLocationFilter(e.target.value)}>
              <option value="All">All Locations</option>
              <option value="Virtual">Virtual</option>
              <option value="In-person">In-person</option>
            </select>

            <select onChange={(e) => setFreeFilter(e.target.value)}>
              <option value="All">Free & Paid</option>
              <option value="true">Free Only</option>
              <option value="false">Paid Only</option>
            </select>
          </div>
        </div>
        {filteredOpportunities.length === 0 && (
          <p style={{ color: "#777", fontStyle: "italic" }}>
            No opportunities match your search.
          </p>
        )}
        <div className="opportunity-grid">
          {filteredOpportunities.map((opp) => (
            <div key={opp.id} className="opportunity-card">
              <h3>
                <Link
                  className="opportunity-title"
                  to={`/opportunity/${opp.id}`}
                >
                  {opp.title}
                </Link>
              </h3>

              <span className="category-tag">{opp.category}</span>

              <p className="card-description">{opp.description}</p>

              <span className="deadline-badge">Deadline: {opp.deadline}</span>

              <span className="urgency-badge">{getUrgency(opp.deadline)}</span>

              <div className="card-footer">
                <a
                  className="learn-link"
                  href={opp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </a>

                <button
                  className="bookmark-btn"
                  onClick={() => handleToggleSave(opp.id)}
                >
                  {savedMap[opp.id] ? "🔖" : "📑"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Browse;
