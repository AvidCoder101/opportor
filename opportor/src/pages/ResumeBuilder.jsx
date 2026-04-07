import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
    skills: "",
  });
  const resumeRef = useRef();
  const downloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("my_resume.pdf");
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageWrapper>
      <div className="resume-page">
        <div className="resume-builder">
          {/* LEFT SIDE (FORM) */}
          <div className="resume-form">
            <h2 className="resume-title">Build Your Resume ✨</h2>

            <input
              className="resume-input"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
            <input
              className="resume-input"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <textarea
              className="resume-textarea"
              name="education"
              placeholder="Education"
              onChange={handleChange}
            />
            <textarea
              className="resume-textarea"
              name="experience"
              placeholder="Experience / Activities"
              onChange={handleChange}
            />
            <textarea
              className="resume-textarea"
              name="skills"
              placeholder="Skills"
              onChange={handleChange}
            />

            {/* ✅ MOVE BUTTON HERE */}
            <button className="download-btn" onClick={downloadPDF}>
              Download Resume 📄
            </button>
          </div>

          {/* RIGHT SIDE (PREVIEW) */}
          <div className="resume-preview" ref={resumeRef}>
            <div className="resume-name">{form.name || "Your Name"}</div>

            <div className="resume-email">{form.email || "your@email.com"}</div>

            <div className="resume-section">
              <h3>Education</h3>
              <p>{form.education}</p>
            </div>

            <div className="resume-section">
              <h3>Experience</h3>
              <p>{form.experience}</p>
            </div>

            <div className="resume-section">
              <h3>Skills</h3>
              <p>{form.skills}</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ResumeBuilder;
