import React, { useState } from "react";
import axios from "axios";
import "./../styles/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://chat-app-backend-z8ta.onrender.com/api/auth/login",
        { username, password }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        alert("Login successful!");
        window.location.href = "/home";
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      {/* Header */}
      <header className="app-header">
        <h1>ChatApp</h1>
        <p>Connect in Real-Time</p>
      </header>

      {/* Login Box */}
      <div className="login-box">
        <h2>Login to ChatApp</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
   Don't have an account? <Link to="/register">Register here</Link>
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

export default Login;
