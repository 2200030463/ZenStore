import "./Auth.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleReset = async () => {
        if (!email) {
            setError("Please enter your email address.");
            setMessage("");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent! Please check your inbox (and spam folder).");
            setError("");
        } catch (err) {
            // Format common firebase errors
            if (err.code === "auth/user-not-found") {
                setError("No account found with this email.");
            } else {
                setError(err.message);
            }
            setMessage("");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Reset Password</h2>
                <p className="auth-subtitle">Enter your email and we'll send you a link to reset your password.</p>

                <div className="auth-form">
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {message && <p style={{ color: "#059669", fontSize: "14px", marginBottom: "15px", fontWeight: "600" }}>{message}</p>}
                    {error && <p style={{ color: "#dc2626", fontSize: "14px", marginBottom: "15px", fontWeight: "600" }}>{error}</p>}

                    <button className="auth-btn-primary" onClick={handleReset}>
                        Send Reset Link
                    </button>
                </div>

                <div className="auth-footer" style={{ marginTop: "30px" }}>
                    Remember your password? <Link to="/login">Back to Login</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
