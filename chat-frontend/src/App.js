import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage"; // Import HomePage
import ChatPage from "./components/ChatPage";

function App() {
  // Check if the user is authenticated (i.e., token exists in localStorage)
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* If not authenticated, show Login page */}
        <Route path="/" element={ <Login />} />

        {/* Route for Register page */}
        <Route path="/register" element={<Register />} />

        {/* Route for HomePage (Dashboard), accessible only if logged in */}
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
        /> 
        {/* Route for Register page */}
       <Route path="/chat" element={ <ChatPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
