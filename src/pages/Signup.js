import "./Auth.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !phone || !password) {
      alert("Please fill all required fields");
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      const user = {
        name: name,
        email: email,
        phone: phone
      };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Account created successfully. Welcome to Zenstore!");
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered! Please login instead, or use the Forgot Password link.");
      } else if (error.code === "auth/weak-password") {
        alert("Password is too weak. Please use at least 6 characters.");
      } else {
        alert(error.message);
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = {
        name: result.user.displayName || result.user.email,
        email: result.user.email,
        phone: ""
      };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join Zenstore for premium organic goods.</p>

        <div className="auth-form">
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="e.g. Sriram Gorrepati"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="sriram@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              placeholder="+91 86887 63435"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-btn-primary" onClick={handleSignup}>
            Create Account
          </button>
        </div>

        <div className="auth-divider">Or quick setup with</div>

        <button className="auth-btn-secondary" onClick={handleGoogleSignup}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="google-icon" />
          Sign up with Google
        </button>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Log in here</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
