import React, { useState, useEffect } from 'react';
import { Home, Edit3 } from 'lucide-react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function MasjidDashboard() {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('home');
    const [notice, setNotice] = useState('');
    const [masjidName, setMasjidName] = useState('');
    const [prayerTimes, setPrayerTimes] = useState([
        { name: 'Fajr', azaan: '04:45', iqamath: '04:45' },
        { name: 'Zuhar', azaan: '12:45', iqamath: '12:45' },
        { name: 'Asar', azaan: '15:45', iqamath: '15:45' },
        { name: 'Maghrib', azaan: '18:45', iqamath: '18:45' },
        { name: 'Isha', azaan: '20:45', iqamath: '20:45' },
        { name: 'Jummah', azaan: '13:00', iqamath: '13:00' },
    ]);
    const [lastUpdate, setLastUpdate] = useState('');

    // Mock storage for demonstration
    // const localStorage = {
    //     getItem: (key) => {
    //         const mockData = {
    //             "masjidID": "123",
    //             "masjidToken": "demo-token"
    //         };
    //         return mockData[key] || null;
    //     },
    //     removeItem: (key) => {
    //         console.log(`Removed ${key} from storage`);
    //     }
    // };

    const handleLogout = () => {
        localStorage.removeItem("masjidID");
        localStorage.removeItem("masjidToken");
        navigate("/masjid/login")
        console.log('Logout clicked');
    };

    const scrollToNotice = () => {
        const noticeElement = document.getElementById('notice-section');
        if (noticeElement) {
            noticeElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const masjidId = localStorage.getItem("masjidID");
        const token = localStorage.getItem("masjidToken");

        if (!masjidId || !token) {
            console.error("Missing masjidID or token");
            return;
        }

        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/masjid/selected/${masjidId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const masjid = res.data;

                setMasjidName(masjid.name);
                setPrayerTimes([
                    {
                        name: "Fajr",
                        azaan: masjid.fajr,
                        iqamath: masjid.fajrIqamath,
                    },
                    {
                        name: "Zuhar",
                        azaan: masjid.zuhar,
                        iqamath: masjid.zuharIqamath,
                    },
                    {
                        name: "Asar",
                        azaan: masjid.asar,
                        iqamath: masjid.asarIqamath,
                    },
                    {
                        name: "Maghrib",
                        azaan: masjid.maghrib,
                        iqamath: masjid.maghribIqamath,
                    },
                    {
                        name: "Isha",
                        azaan: masjid.isha,
                        iqamath: masjid.ishaIqamath,
                    },
                    {
                        name: "Jummah",
                        azaan: masjid.jummah,
                        iqamath: masjid.jummahIqamath,
                    },
                ]);
                setNotice(masjid.announcements || '');
                setLastUpdate(masjid.lastUpdated || new Date().toISOString().slice(0, 10));
            })
            .catch((err) => {
                console.error("Error fetching masjid data:", err);
            });
    }, []);

    const handleUpdateTimes = () => {
        const masjidId = localStorage.getItem("masjidID");
        const token = localStorage.getItem("masjidToken");

        if (!masjidId || !token) {
            console.error("Missing masjidID or token");
            return;
        }

        // Updated payload to match your database schema
        const payload = {
            fajr: prayerTimes[0].azaan,
            fajrIqamath: prayerTimes[0].iqamath,
            zuhar: prayerTimes[1].azaan,
            zuharIqamath: prayerTimes[1].iqamath,
            asar: prayerTimes[2].azaan,
            asarIqamath: prayerTimes[2].iqamath,
            maghrib: prayerTimes[3].azaan,
            maghribIqamath: prayerTimes[3].iqamath,
            isha: prayerTimes[4].azaan,
            ishaIqamath: prayerTimes[4].iqamath,
            jummah: prayerTimes[5].azaan,
            jummahIqamath: prayerTimes[5].iqamath,
            lastUpdated: new Date().toISOString().slice(0, 10),
        };
        console.log(payload);

        axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/api/masjid/${masjidId}/times`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("Times updated:", res.data);
                setLastUpdate(new Date().toISOString().slice(0, 10));
                setCurrentView("home");
            })
            .catch((err) => {
                console.error("Error updating times:", err);
            });
    };

    const handleAddNotice = () => {
        const masjidId = localStorage.getItem("masjidID");
        const token = localStorage.getItem("masjidToken");

        if (!masjidId || !token) {
            console.error("Missing masjidID or token");
            return;
        }

        axios
            .post(
                `${import.meta.env.VITE_BACKEND_URL}/api/masjid/${masjidId}/addannouncements`,
                { announcements: notice },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log("Notice added:", res.data);
                setCurrentView("home");
            })
            .catch((err) => {
                console.error("Error adding notice:", err);
            });
    };

    const handleRemoveNotice = () => {
        const masjidId = localStorage.getItem("masjidID");
        const token = localStorage.getItem("masjidToken");

        if (!masjidId || !token) {
            console.error("Missing masjidID or token");
            return;
        }

        axios
            .post(
                `${import.meta.env.VITE_BACKEND_URL}/api/masjid/${masjidId}/removeannouncements`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log("Notice removed:", res.data);
                setNotice("");
                setCurrentView("home");
            })
            .catch((err) => {
                console.error("Error removing notice:", err);
            });
    };


    // Home View Component
    const HomeView = () => (
        <div className="max-w-md mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Current Timing
            </h1>

            {/* Prayer Times Card */}
            <div className="bg-yellow-300 rounded-4xl px-8 py-8 mb-8">
                {/* Table Header */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="font-bold text-gray-800 text-lg">NAMAZ</div>
                    <div className="font-bold text-gray-800 text-lg text-center">AZAAN</div>
                    <div className="font-bold text-gray-800 text-lg text-center">IQAMATH</div>
                </div>

                {/* Prayer Times Rows */}
                {prayerTimes.map((prayer, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3 py-2">
                        <div className="font-medium text-gray-800 text-lg">{prayer.name}</div>
                        <div className="font-bold text-gray-800 text-xl text-center">{prayer.azaan}</div>
                        <div className="font-bold text-gray-800 text-xl text-center">{prayer.iqamath}</div>
                    </div>
                ))}

                {/* Last Update */}
                <div className="text-center text-lg text-gray-700 mt-6">
                    Last update: {lastUpdate || '05-07-2025'}
                </div>
            </div>

            {/* Notice Section */}
            <div id="notice-section" className="scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Current Notice
                </h2>

                <div className="bg-yellow-300 rounded-4xl p-8 mb-24">
                    <div className="text-center">
                        <div className="text-lg font-medium text-gray-800 mb-8">
                            {notice || "No Notice/Announcement"}
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setCurrentView('edit')}
                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-6 py-2 rounded-full transition-colors"
                            >
                                {notice ? 'EDIT NOTICE' : 'ADD NOTICE'}
                            </button>
                            {notice && (
                                <button
                                    onClick={handleRemoveNotice}
                                    className="bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-full transition-colors"
                                >
                                    REMOVE NOTICE
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Edit View Component
    const EditView = () => (
        <div className="max-w-md mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Edit Details
            </h1>

            {/* Edit Prayer Times */}
            <div className="bg-yellow-300 rounded-4xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Prayer Times</h3>

                <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="font-medium text-gray-800 text-sm">Prayer</div>
                    <div className="font-medium text-gray-800 text-sm text-center">Azaan</div>
                    <div className="font-medium text-gray-800 text-sm text-center">Iqamath</div>
                </div>

                {prayerTimes.map((prayer, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 py-2 items-center">
                        <div className="font-medium text-gray-800 text-sm">{prayer.name}</div>
                        <input
                            type="time"
                            value={prayer.azaan}
                            onChange={(e) => {
                                const newTimes = [...prayerTimes];
                                newTimes[index].azaan = e.target.value;
                                setPrayerTimes(newTimes);
                            }}
                            className="bg-yellow-400 rounded px-2 py-1 text-sm"
                        />
                        <input
                            type="time"
                            value={prayer.iqamath}
                            onChange={(e) => {
                                const newTimes = [...prayerTimes];
                                newTimes[index].iqamath = e.target.value;
                                setPrayerTimes(newTimes);
                            }}
                            className="bg-yellow-400 rounded px-2 py-1 text-sm"
                        />
                    </div>
                ))}

                <button
                    onClick={handleUpdateTimes}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 rounded-full mt-4 transition-colors"
                >
                    UPDATE TIMES
                </button>
            </div>

            {/* Edit Notice */}
            <div className="bg-yellow-300 rounded-4xl p-6 mb-24">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Add/Edit Notice</h3>

                <textarea
                    value={notice}
                    onChange={(e) => setNotice(e.target.value)}
                    placeholder="Enter your notice here..."
                    className="w-full h-32 bg-yellow-400 rounded-lg p-4 text-gray-800 placeholder-gray-600 resize-none"
                />

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleAddNotice}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 rounded-full transition-colors"
                    >
                        SAVE NOTICE
                    </button>
                    {notice && (
                        <button
                            onClick={handleRemoveNotice}
                            className="flex-1 bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-full transition-colors"
                        >
                            REMOVE NOTICE
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-orange-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-md mx-auto px-4 py-0 flex items-center justify-between">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-3">
                        <div>
                            <img className="w-20 h-20" src='/myMasjidTimes_Logo.png' alt="Logo" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-600">myMasjidTimes</div>
                            <div className="text-sm font-semibold text-gray-800">
                                {masjidName || 'Loading...'}
                            </div>
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
            {currentView === 'home' ? <HomeView /> : <EditView />}

            {/* Bottom Navigation */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 rounded-full px-8 py-3 flex items-center space-x-6 shadow-lg">
                    <button
                        onClick={() => setCurrentView('home')}
                        className={`p-2 rounded-full transition-colors ${currentView === 'home' ? 'bg-yellow-500' : 'hover:bg-yellow-500'
                            }`}
                    >
                        <Home size={24} className="text-gray-800" />
                    </button>
                    <button
                        onClick={() => setCurrentView('edit')}
                        className={`p-2 rounded-full transition-colors ${currentView === 'edit' ? 'bg-yellow-500' : 'hover:bg-yellow-500'
                            }`}
                    >
                        <Edit3 size={24} className="text-gray-800" />
                    </button>
                </div>
            </div>
        </div>
    );
}