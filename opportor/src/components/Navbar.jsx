import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const [savedCount, setSavedCount] = useState(0);
  const [user, setUser] = useState(null);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Track saved opportunities count
  useEffect(() => {
    if (!user) {
      setSavedCount(0);
      return;
    }

    const unsubscribe = onSnapshot(collection(db, "savedOpportunities"), (snapshot) => {
      let count = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.userId === user.uid) {
          count++;
        }
      });

      setSavedCount(count);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Opportor
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/browse">Browse</Link>

        {user && (
          <Link to="/saved">
            Saved {savedCount > 0 ? `(${savedCount})` : ""}
          </Link>
        )}

        {user ? (
          <div className="nav-user">
            <span>{user.email.split("@")[0]}</span>

            <button onClick={handleLogout} className="logout-btn">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/resume">Resume Builder</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;