import React from 'react';
import './App.css';
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import MasjidLoginPage from './components/MasjidComponents/MasjidLoginPage';
import MasjidSignupPage from './components/MasjidComponents/MasjidSignupPage';
import MasjidDashboard from './components/MasjidComponents/MasjidDashboard';

import AppHome from './components/UserComponents/AppHome';
import HomePage from './components/UserComponents/HomePage';
import MasjidListPage from './components/UserComponents/MasjidListPage';
import PrayerTimesPage from './components/UserComponents/PrayerTimesPage';
import FavouritePage from './components/UserComponents/FavouritePage';
import LearningsPage from './components/UserComponents/LearningsPage';
import AboutPage from './components/UserComponents/AboutPage';

import DeveloperPage from './components/DeveloperPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Masjid routes */}
          <Route path="/masjid/login" element={<MasjidLoginPage />} />
          <Route path="/masjid/signup" element={<MasjidSignupPage />} />
          <Route path="/masjid/dashboard" element={<MasjidDashboard />} />

          {/* User routes */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<AppHome><HomePage /></AppHome>} />
          <Route path="/masjids" element={<AppHome><MasjidListPage /></AppHome>} />
          <Route path="/favorite" element={<AppHome><FavouritePage /></AppHome>} />
          <Route path="/learn" element={<AppHome><LearningsPage /></AppHome>} />
          <Route path="/about" element={<AppHome><AboutPage /></AppHome>} />

          <Route path="/masjid-timing/:id" element={<PrayerTimesPage />} />

          {/* Developer Page */}
          <Route path="/app/developer" element={<DeveloperPage />} />

          {/* 404 - Not found route */}
          <Route path="*" element={
            <Navigate to="/home" replace />
          } />
        </Routes>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
    </Router>
  );
}

export default App;
