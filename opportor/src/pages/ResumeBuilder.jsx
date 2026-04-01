import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
    skills: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageWrapper>
      <div className="resume-builder">

        {/* LEFT SIDE (FORM) */}
        <div className="resume-form">
          <h2>Build Your Resume ✨</h2>

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <textarea
            name="education"
            placeholder="Education"
            onChange={handleChange}
          />

          <textarea
            name="experience"
            placeholder="Experience / Activities"
            onChange={handleChange}
          />

          <textarea
            name="skills"
            placeholder="Skills"
            onChange={handleChange}
          />
        </div>

        {/* RIGHT SIDE (PREVIEW) */}
        <div className="resume-preview">
          <h2>{form.name || "Your Name"}</h2>
          <p>{form.email}</p>

          <h3>Education</h3>
          <p>{form.education}</p>

          <h3>Experience</h3>
          <p>{form.experience}</p>

          <h3>Skills</h3>
          <p>{form.skills}</p>
        </div>

      </div>
    </PageWrapper>
  );
}

export default ResumeBuilder;