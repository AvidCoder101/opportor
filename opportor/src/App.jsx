import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Saved from "./pages/Saved";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Opportunity from "./pages/Opportunity";
import OpportunityDetail from "./pages/OpportunityDetail";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/saved" element={<Saved user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/opportunity/:id" element={<Opportunity />} />
        <Route path="/opportunity/:id" element={<OpportunityDetail />} />
      </Routes>
    </Router>
  );
}

export default App;