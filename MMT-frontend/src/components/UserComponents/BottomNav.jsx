import React from 'react';
import { Home, Clock, Star, Book, Grid3X3 } from 'lucide-react';

const BottomNav = ({ currentPage, setCurrentPage }) => (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-yellow-400 rounded-full px-8 py-3 flex items-center space-x-6 shadow-lg">
            <button
                onClick={() => setCurrentPage('home')}
                className={`p-2 rounded-full transition-colors ${currentPage === 'home' ? 'bg-yellow-500' : 'hover:bg-yellow-500'}`}
            >
                <Home size={24} className="text-gray-800" />
            </button>
            <button
                onClick={() => setCurrentPage('masjid')}
                className={`p-2 rounded-full transition-colors ${currentPage === 'masjid' ? 'bg-yellow-500' : 'hover:bg-yellow-500'}`}
            >
                <Clock size={24} className="text-gray-800" />
            </button>
            <button
                onClick={() => setCurrentPage('favourite')}
                className={`p-2 rounded-full transition-colors ${currentPage === 'favourite' ? 'bg-yellow-500' : 'hover:bg-yellow-500'}`}
            >
                <Star size={24} className="text-gray-800" />
            </button>
            <button
                onClick={() => setCurrentPage('learnings')}
                className={`p-2 rounded-full transition-colors ${currentPage === 'learnings' ? 'bg-yellow-500' : 'hover:bg-yellow-500'}`}
            >
                <Book size={24} className="text-gray-800" />
            </button>
            <button
                onClick={() => setCurrentPage('about')}
                className={`p-2 rounded-full transition-colors ${currentPage === 'about' ? 'bg-yellow-500' : 'hover:bg-yellow-500'}`}
            >
                <Grid3X3 size={24} className="text-gray-800" />
            </button>
        </div>
    </div>
);

export default BottomNav;