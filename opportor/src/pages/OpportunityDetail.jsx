import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import PageWrapper from "../components/PageWrapper";

function OpportunityDetail() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    const fetchOpportunity = async () => {
      const docRef = doc(db, "opportunities", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOpportunity(docSnap.data());
      }
    };

    fetchOpportunity();
  }, [id]);

  if (!opportunity) {
    return (
      <PageWrapper>
        <p>Loading opportunity...</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <h1>{opportunity.title}</h1>

      <span className="category-tag">{opportunity.category}</span>

      <p style={{ marginTop: "20px", maxWidth: "700px" }}>
        {opportunity.description}
      </p>

      <span className="deadline-badge">Deadline: {opportunity.deadline}</span>

      <div style={{ marginTop: "25px" }}>
        <a
          href={opportunity.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-button"
        >
          Apply / Learn More
        </a>
      </div>
    </PageWrapper>
  );
}

export default OpportunityDetail;
