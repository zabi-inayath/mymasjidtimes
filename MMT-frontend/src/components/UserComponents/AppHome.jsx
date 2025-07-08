import React, { useState } from 'react';
import HomePage from './HomePage';
import MasjidListPage from './MasjidListPage';
import FavouritePage from './FavouritePage';
import LearningsPage from './LearningsPage';
import AboutPage from './AboutPage';
import BottomNav from './BottomNav';

const AppHome = () => {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage />;
            case 'masjid':
                return <MasjidListPage />;
            case 'favourite':
                return <FavouritePage />;
            case 'learnings':
                return <LearningsPage />;
            case 'about':
                return <AboutPage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="max-w-md mx-auto bg-[#fef9ef] min-h-screen">
            {renderPage()}
            <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default AppHome;