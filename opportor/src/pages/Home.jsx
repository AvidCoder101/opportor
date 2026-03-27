import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { auth } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

function Home() {
  const [opportunities, setOpportunities] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [userInterest, setUserInterest] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      if (!auth.currentUser) return;

      const docRef = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setUserInterest(snap.data().interest);
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const fetchOpportunities = async () => {
      const snapshot = await getDocs(collection(db, "opportunities"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOpportunities(data.slice(0, 3)); // show first 3
    };

    fetchOpportunities();
  }, []);
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!auth.currentUser) return;

      const savedSnapshot = await getDocs(collection(db, "savedOpportunities"));

      const savedCategories = [];

      savedSnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.userId === auth.currentUser.uid) {
          savedCategories.push(data.category);
        }
      });

      const oppSnapshot = await getDocs(collection(db, "opportunities"));

      const recs = [];

      oppSnapshot.forEach((doc) => {
        const data = doc.data();

        if (savedCategories.includes(data.category)) {
          recs.push({
            id: doc.id,
            ...data,
          });
        }
      });

      setRecommended(recs.slice(0, 3));
    };

    fetchRecommendations();
  }, []);
  return (
    <PageWrapper>
      <div className="hero">
        <h1 className="hero-title">Discover Opportunities for Students</h1>

        <p className="hero-subtitle">
          Find <b>scholarships</b>, <b>competitions </b> and <b>programs</b> seamlessly in one platform, helping you explore your aspirations and prepare you for building your future.
        </p>

        <Link to="/browse" className="hero-button">
          Let's browse!
        </Link>
      </div>
      <h2 style={{ textAlign: "center", marginTop: "60px" }}>
        Trending Opportunities
      </h2>

      <div className="opportunity-grid">
        {opportunities.map((opp) => (
          <div key={opp.id} className="opportunity-card">
            <h3>
              <Link className="opportunity-title" to={`/opportunity/${opp.id}`}>
                {opp.title}
              </Link>
            </h3>

            <span className="category-tag">{opp.category}</span>

            <p className="card-description">{opp.description}</p>

            <span className="deadline-badge">Deadline: {opp.deadline}</span>
          </div>
        ))}
      </div>
     <div className="home-section">

  <h2 className="section-title"> Recommended For You</h2>

  <div className="opportunity-grid">
    {recommended.map((opp) => (
      <div key={opp.id} className="opportunity-card">
        <h3>
          <Link className="opportunity-title" to={`/opportunity/${opp.id}`}>
            {opp.title}
          </Link>
        </h3>

        <span className="category-tag">{opp.category}</span>

        <p className="card-description">{opp.description}</p>

        <span className="deadline-badge">
          Deadline: {opp.deadline}
        </span>
      </div>
    ))}
  </div>

  {/* FEATURES */}
  <div className="features-wrapper">
    <h2 className="section-title"> Why Opportor?</h2>

    <div className="features-grid">
      <div className="feature-card">
        <h3>🔎 Discover Opportunities</h3>
        <p>Explore scholarships, competitions, internships and programs.</p>
      </div>

      <div className="feature-card">
        <h3>⭐ Personalized Picks</h3>
        <p>Get recommendations based on what you save.</p>
      </div>

      <div className="feature-card">
        <h3>📌 Stay Organized</h3>
        <p>Bookmark opportunities and track deadlines easily.</p>
      </div>
    </div>
  </div>

</div>
    </PageWrapper>
  );
}

export default Home;
