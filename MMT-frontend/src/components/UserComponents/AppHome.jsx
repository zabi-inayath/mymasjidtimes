import React from 'react';
import BottomNav from './BottomNav';

const AppHome = ({ children }) => {
    return (
        <div className="max-w-md mx-auto bg-[#fef9ef] min-h-screen flex flex-col">
            <div className="flex-grow">
                {children}
            </div>
            <BottomNav />
        </div>
    );
};

export default AppHome;
