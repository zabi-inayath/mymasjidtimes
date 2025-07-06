import React from 'react';
import './App.css';
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MasjidLoginPage from './components/MasjidComponents/MasjidLoginPage';
import MasjidSignupPage from './components/MasjidComponents/MasjidSignupPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect root to login */}
          <Route path="*" element={<Navigate to="/" replace />} />

          {/* Masjid route */}
          <Route path="/masjid/login" element={<MasjidLoginPage />} />
          <Route path="/masjid/signup" element={<MasjidSignupPage />} />
          <Route path="/masjid/dashboard" element={<MasjidSignupPage />} />

          {/* You can add more routes here */}
          {/* <Route path="/masjid/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/masjid/settings" element={<Settings />} /> */}

          {/* 404 - Not found route */}
          <Route path="*" element={<div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-600">Page not found</p>
            </div>
          </div>} />
        </Routes>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
    </Router>
  );
}

export default App;