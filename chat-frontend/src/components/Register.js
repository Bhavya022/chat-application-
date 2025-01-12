import React, { useState } from "react";
import axios from "axios";
import "./../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "https://chat-app-backend-z8ta.onrender.com/api/auth/register",
        { username, password }
      );
      if (response.status === 201) {
        setSuccess("Registration successful! Please log in.");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError("Registration failed. Try a different username.");
    }
  };

  return (
    <div className="register-container">
      {/* Header */}
      <header className="app-header">
        <h1>ChatApp</h1>
        <p>Connect in Real-Time</p>
      </header>

      {/* Register Box */}
      <div className="register-box">
        <h2>Register for ChatApp</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/">Login here</a>
        </p>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          <a href="/about">About Us</a> | <a href="/contact">Contact</a> |{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
        <p>© 2025 ChatApp. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Register;
