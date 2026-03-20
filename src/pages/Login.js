import "./Auth.css";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'phone'

  // Email state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Phone state
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = {
        name: result.user.displayName || result.user.email,
        email: result.user.email
      };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved
        }
      });
    }
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number with country code (e.g. +91 8688763435)");
      return;
    }
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      // Format number intelligently if user drops country code
      let formattedPhone = phone.trim();
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = `+91${formattedPhone}`;
      }

      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
      alert("OTP Sent Successfully! Please check your messages.");
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP. Ensure 'Phone' login provider is enabled in your Firebase console. " + error.message);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;
    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = {
        name: "Zenstore Member",
        phone: result.user.phoneNumber,
        email: ""
      };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert("Invalid OTP Code entered.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = {
        name: result.user.displayName || result.user.email,
        email: result.user.email
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
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to your Zenstore account to continue.</p>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${loginMethod === 'email' ? 'active' : ''}`}
            onClick={() => setLoginMethod("email")}
          >
            Email Login
          </button>
          <button
            className={`auth-tab ${loginMethod === 'phone' ? 'active' : ''}`}
            onClick={() => setLoginMethod("phone")}
          >
            Phone Login
          </button>
        </div>

        {loginMethod === "email" ? (
          <div className="auth-form">
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '13px', color: '#166534', fontWeight: '600', textDecoration: 'none' }}>Forgot Password?</Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="auth-btn-primary" onClick={handleEmailLogin}>
              Secure Login
            </button>
          </div>
        ) : (
          <div className="auth-form">
            {!otpSent ? (
              <>
                <div className="input-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91 86887 63435"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button className="auth-btn-primary" onClick={handleSendOtp}>
                  Get Secure OTP
                </button>
              </>
            ) : (
              <>
                <div className="input-group">
                  <label>Enter 6-digit OTP</label>
                  <input
                    type="number"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button className="auth-btn-primary" onClick={handleVerifyOtp}>
                  Verify & Login
                </button>
                <p style={{ textAlign: "center", marginTop: "15px" }}>
                  <button onClick={() => setOtpSent(false)} style={{ background: "none", border: "none", color: "#166534", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
                    Change Phone Number
                  </button>
                </p>
              </>
            )}
            <div id="recaptcha-container"></div>
          </div>
        )}

        <div className="auth-divider">Or continue with</div>

        <button className="auth-btn-secondary" onClick={handleGoogleLogin}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="google-icon" />
          Continue with Google
        </button>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Create one now</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
