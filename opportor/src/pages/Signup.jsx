import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import PageWrapper from "../components/PageWrapper";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [interest, setInterest] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Account created successfully! You can now log in.");
      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    <select
      value={interest}
      onChange={(e) => setInterest(e.target.value)}
      required
    >
      <option value="">Select your interest</option>
      <option value="STEM">STEM</option>
      <option value="Arts">Arts</option>
      <option value="Business">Business</option>
      <option value="Healthcare">Healthcare</option>
    </select>;

    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      email,
      interest,
    });
  };

  return (
    <PageWrapper>
      <div className="auth-container">
        <h2 className="auth-title">Create an Account</h2>

        <form onSubmit={handleSignup}>
          <input className="auth-input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input className="auth-input"
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-button" type="submit">Create Account</button>
        </form>

        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}

        <p className="auth-subtext">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </PageWrapper>
  );
}

export default Signup;
