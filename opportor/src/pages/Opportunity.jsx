import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

function Opportunity() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const getUrgency = (deadline) => {
    const today = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

    if (diff <= 3) return "🔥 Urgent";
    if (diff <= 7) return "⏳ Closing Soon";
    return "🟢 Open";
  };
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
    return <p style={{ padding: "2rem" }}>Loading opportunity...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{opportunity.title}</h2>

      <p>
        <strong>Category:</strong> {opportunity.category}
      </p>
      <p>
        <strong>Deadline:</strong> {opportunity.deadline}
      </p>

      <p style={{ marginTop: "1rem" }}>{opportunity.description}</p>

      <a href={opportunity.link} target="_blank" rel="noopener noreferrer" className="apply-btn">
        Apply Now / Learn More
      </a>
      <span className="urgency-badge">{getUrgency(opportunity.deadline)}</span>
    </div>
  );
}

export default Opportunity;
