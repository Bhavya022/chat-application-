import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';  // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>  {/* Wrap your app with BrowserRouter */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
