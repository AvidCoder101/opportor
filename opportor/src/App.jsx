import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useAccessibility } from "./context/useAccessibility";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Saved from "./pages/Saved";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpportunityDetail from "./pages/OpportunityDetail";
import ResumeBuilder from "./pages/ResumeBuilder";
import AccessibilityPanel from "./components/AccessibilityPanel";

function App() {
  const [user, setUser] = useState(null);

  const {
    fontSize,
    highContrast,
    reduceMotion,
    dyslexiaFont,
  } = useAccessibility();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
  <>
    <AccessibilityPanel />

    <div
      className={`
        ${fontSize === "large" ? "large-text" : ""}
        ${highContrast ? "high-contrast" : ""}
        ${reduceMotion ? "reduce-motion" : ""}
        ${dyslexiaFont ? "dyslexia-font" : ""}
      `}
    >
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/saved" element={<Saved user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/opportunity/:id" element={<OpportunityDetail />} />
        <Route path="/resume" element={<ResumeBuilder />} />
      </Routes>
    </div>
  </>
);
}

export default App;