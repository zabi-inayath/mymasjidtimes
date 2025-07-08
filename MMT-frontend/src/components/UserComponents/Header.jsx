import { MapPin } from 'lucide-react';
import React from 'react';

const Header = () => (
    <div className="bg-[#fef9ef] pl-6 pr-4 -py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="text-center mb-6">
                <div className="-mb-3">
                    <img className='h-20 w-20 mx-auto' src='/myMasjidTimes_Logo.png' alt="Logo" />
                </div>
                <h1 className="text-sm hagrid font-bold text-gray-800">
                    myMasjidTimes
                </h1>
            </div>
        </div>
        <div className="flex items-center justify-center gap-1 bg-yellow-400 text-sm font-semibold px-3 py-2 rounded-4xl shadow-sm">
            <MapPin className="h-4 w-4 text-gray-800" />
            <span className="text-gray-800">Vaniyambadi</span>
        </div>
    </div>
);

export default Header;