import React from 'react';
import { Home, FileText } from 'lucide-react';

export default function MasjidDashboard() {
    const prayerTimes = [
        { name: 'Fajr', namaz: '04.45', azaan: '04.45', iqamath: '04.45' },
        { name: 'Zuhar', namaz: '04.45', azaan: '04.45', iqamath: '04.45' },
        { name: 'Asar', namaz: '04.45', azaan: '04.45', iqamath: '04.45' },
        { name: 'Maghrib', namaz: '04.45', azaan: '04.45', iqamath: '04.45' },
        { name: 'Isha', namaz: '04.45', azaan: '04.45', iqamath: '04.45' },
        { name: 'Jummah', namaz: '04.45', azaan: '04.45', iqamath: '04.45' },
    ];

    const handleLogout = () => {
        console.log('Logout clicked');
        
        localStorage.removeItem('masjidToken'); // Assuming you store the token in localStorage
        window.location.href = '/masjid/login'; // Redirect to login page
    };

    return (
        <div className="min-h-screen bg-orange-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-md mx-auto px-4 py-0 flex items-center justify-between">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-3">
                        <div >
                            <img className="w-20 h-20" src='/myMasjidTimes_Logo.png' alt="Logo" />
                        </div>
                        <div>
                            <div className="text-xs hagrid font-bold text-black-600 mb-1">myMasjidTimes</div>
                            <div className="text-sm poppins font-semibold text-gray-800">Masjid e Khaderpet</div>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-300 hover:bg-red-400 text-red-800 text-xs font-medium px-3 py-1 rounded-full transition-colors"
                    >
                        LOGOUT
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-md mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Current Timing
                </h1>

                {/* Prayer Times Card */}
                <div className="bg-yellow-300 rounded-lg p-6 mb-8">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="font-bold text-gray-800 text-sm">NAMAZ</div>
                        <div className="font-bold text-gray-800 text-sm text-center">AZAAN</div>
                        <div className="font-bold text-gray-800 text-sm text-center">IQAMATH</div>
                        <div></div>
                    </div>

                    {/* Prayer Times Rows */}
                    {prayerTimes.map((prayer, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 py-2">
                            <div className="font-medium text-gray-800 text-sm">{prayer.name}</div>
                            <div className="font-bold text-gray-800 text-sm text-center">{prayer.azaan}</div>
                            <div className="font-bold text-gray-800 text-sm text-center">{prayer.iqamath}</div>
                            <div></div>
                        </div>
                    ))}

                    {/* Last Update */}
                    <div className="text-center text-xs text-gray-700 mt-6">
                        Last update: 05-07-2025
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-400 rounded-full px-8 py-3 flex items-center space-x-6 shadow-lg">
                        <button className="p-2 rounded-full hover:bg-yellow-500 transition-colors">
                            <Home size={24} className="text-gray-800" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-yellow-500 transition-colors">
                            <FileText size={24} className="text-gray-800" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}