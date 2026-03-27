import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (err) {

      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      }
      else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      }
      else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email.");
      }
      else if (err.code === "auth/too-many-requests") {
        setError("Too many login attempts. Try again later.");
      }
      else {
        setError("Login failed. Please try again.");
      }

    }
  };

  return (
    <PageWrapper>

      <div className="auth-container">

        <h2 className="auth-title">Welcome Back</h2>

        <form onSubmit={handleLogin}>

          <input className="auth-input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button className="auth-button" type="submit">Login</button>

        </form>

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        <p className="auth-subtext">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

      </div>

    </PageWrapper>
  );
}

export default Login;