import React, { useEffect, useState } from 'react';
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
  // ----------- NEW: PWA install prompt handling ----------
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent automatic prompt
      e.preventDefault();

      // Save the event for later use
      setDeferredPrompt(e);

      // Show the install button
      setShowInstallButton(true);
    });
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted install prompt');
        } else {
          console.log('User dismissed install prompt');
        }

        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };
  // --------------------------------------------------------

  return (
    <Router>
      <div className="App">
        {/* Optional: place the install button anywhere you like */}
        {showInstallButton && (
          <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
            <button
              onClick={handleInstall}
              style={{
                backgroundColor: '#2196f3',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Install myMasjidTimes
            </button>
          </div>
        )}

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
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>

        <Toaster position="top-center" reverseOrder={true} />
      </div>
    </Router>
  );
}

export default App;
