import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { Link } from "react-router-dom";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";

function Saved({ user }) {
  const [savedOpps, setSavedOpps] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchSaved = async () => {
      try {
        const q = query(
          collection(db, "savedOpportunities"),
          where("userId", "==", user.uid),
        );

        const querySnapshot = await getDocs(q);

        const opportunities = [];

        for (const savedDoc of querySnapshot.docs) {
          const data = savedDoc.data();

          if (!data.opportunityID) {
            console.warn(
              "Missing opportunityId in saved document:",
              savedDoc.id,
            );
            continue;
          }

          const oppRef = doc(db, "opportunities", data.opportunityID);
          const oppSnap = await getDoc(oppRef);

          if (oppSnap.exists()) {
            opportunities.push({
              id: oppSnap.id,
              ...oppSnap.data(),
            });
          }
        }

        setSavedOpps(opportunities);
      } catch (error) {
        console.error("Error fetching saved opportunities:", error);
      }
    };

    fetchSaved();
  }, [user]);

  if (!user) {
    return <div style={{ padding: "2rem" }}>You must be logged in.</div>;
  }

  const handleUnsave = async (opportunityID) => {
    if (!auth.currentUser) return;

    const saveRef = doc(
      db,
      "savedOpportunities",
      `${auth.currentUser.uid}_${opportunityID}`,
    );

    try {
      await deleteDoc(saveRef);

      setSavedOpps((prev) => prev.filter((opp) => opp.id !== opportunityID));
    } catch (error) {
      console.error("Error removing saved opportunity:", error);
    }
  };
  return (
    <PageWrapper>
      <div>
        <h2>Your Saved Opportunities</h2>
        {savedOpps.length === 0 && (
          <div className="empty-state">
            <p>You haven’t saved anything yet 😢</p>
            <Link to="/browse" className="browse-btn">
              Browse Opportunities
            </Link>
          </div>
        )}

        <div className="opportunity-grid">
          {savedOpps.map((opp) => (
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

              <div className="card-footer">
                <Link className="learn-link" to={`/opportunity/${opp.id}`}>
                  View Details
                </Link>

                <button
                  className="save-btn"
                  onClick={() => handleUnsave(opp.id)}
                >
                  Unsave
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Saved;
