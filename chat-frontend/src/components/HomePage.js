import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/HomePage.css"; // Importing the updated CSS file

const HomePage = () => {
  const [status, setStatus] = useState("Offline");
  const [error, setError] = useState("");
  const [isOnline, setIsOnline] = useState(false); // Track if the user is online or offline

  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  // Fetch user status
  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get(
          `https://chat-app-backend-z8ta.onrender.com/api/users/${userId}/status`
        );
        if (response.data.status) {
          setStatus("Online");
          setIsOnline(true);
        } else {
          setStatus("Offline");
          setIsOnline(false);
        }
      } catch (err) {
        setError("Error fetching status");
      }
    };

    if (userId) {
      fetchUserStatus();
    }
  }, [userId]);

  // Handle Go Online/Go Offline status change
  const handleStatusToggle = async () => {
    try {
      const newStatus = !isOnline;
      console.log(newStatus)
      await axios.put(
        `https://chat-app-backend-z8ta.onrender.com/api/users/status`,
        { userId:userId, onlineStatus: newStatus }
      );
      setIsOnline(newStatus);
      setStatus(newStatus ? "Online" : "Offline");
    } catch (err) {
      setError("Error updating status");
    }
  };

  // Logout user
  const handleLogout = async () => {
    try {
      await axios.post("https://chat-app-backend-z8ta.onrender.com/api/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/"; // Redirect to login page
    } catch (err) {
      setError("Error logging out");
    }
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="logo-container">
          <h1>ChatApp</h1>
          <p>Connect with friends in real-time</p>
        </div>
        <div className="header-actions">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <div className="status-container">
          <h2>Your Status: {status}</h2>
          {error && <p className="error-message">{error}</p>}

          <button onClick={handleStatusToggle} className="status-toggle-btn">
            {isOnline ? "Go Offline" : "Go Online"}
          </button>
        </div>

        <div className="chat-link-container">
          <a href="/chat" className="chat-link">Go to Chat</a>
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 ChatApp. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
