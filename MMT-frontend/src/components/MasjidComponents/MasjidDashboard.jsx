import React, { useState, useEffect, useCallback, memo } from 'react';
import { Home, Edit3 } from 'lucide-react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Memoized EditView component
const EditView = memo(({
    prayerTimes,
    notice,
    onPrayerTimeChange,
    onUpdateTimes,
    onNoticeChange,
    onNoticeAction
}) => {
    return (
        <div className="max-w-md mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6 poppins">Edit Details</h1>

            <div className="bg-yellow-300 rounded-4xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 dm-sans">UPDATE TIMES</h3>
                <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="font-bold text-gray-800 text-lg dm-sans">Namaz</div>
                    <div className="font-bold text-gray-800 text-lg text-center dm-sans">Azaan</div>
                    <div className="font-bold text-gray-800 text-lg text-center dm-sans">Iqamath</div>
                </div>

                {prayerTimes.map((prayer, index) => (
                    <div key={index} className="grid grid-cols-3 gap-10 py-2 items-center poppins">
                        <div className="font-bold text-gray-800 text-lg">{prayer.name}</div>
                        <input
                            type="time"
                            value={prayer.azaan}
                            onChange={(e) => onPrayerTimeChange(index, 'azaan', e.target.value)}
                            className="
    bg-yellow-400 
    rounded 
    text-lg 
    w-[100px] 
    sm:w-[120px] 
    px-1 
    py-1
  "
                            step="300"
                        />

                        <input
                            type="time"
                            value={prayer.iqamath}
                            onChange={(e) => onPrayerTimeChange(index, 'iqamath', e.target.value)}
                            className="
    bg-yellow-400 
    rounded 
    text-lg 
    w-[100px] 
    sm:w-[120px]
    px-1 
    py-1
  "
                            step="300"
                        />


                    </div>
                ))}

                <button
                    onClick={onUpdateTimes}
                    className="dm-sans w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 rounded-full mt-4 transition-colors"
                >
                    UPDATE
                </button>
            </div>

            <div className="bg-yellow-300 rounded-4xl p-6 mb-24">
                <h3 className="text-lg font-bold text-gray-800 mb-4 poppins">Add/Edit Notice</h3>
                <textarea
                    value={notice}
                    onChange={(e) => onNoticeChange(e.target.value)}
                    placeholder="Enter your notice here..."
                    className="w-full h-32 bg-yellow-400 rounded-lg p-4 text-gray-800 placeholder-gray-600 resize-none"
                />
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={() => onNoticeAction('add')}
                        className="dm-sans flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 rounded-full transition-colors"
                    >
                        SAVE NOTICE
                    </button>
                    {notice && (
                        <button
                            onClick={() => onNoticeAction('remove')}
                            className="flex-1 bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-full transition-colors"
                        >
                            REMOVE NOTICE
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
});

export default function MasjidDashboard() {
    const navigate = useNavigate();
    const [authChecked, setAuthChecked] = useState(false);
    const [currentView, setCurrentView] = useState('home');
    const [notice, setNotice] = useState('');
    const [masjidName, setMasjidName] = useState('');
    const [prayerTimes, setPrayerTimes] = useState([]);
    const [lastUpdate, setLastUpdate] = useState('');
    const [loading, setLoading] = useState(true);

    const validateAuth = useCallback(async () => {
        const masjidId = localStorage.getItem("masjidID");
        const token = localStorage.getItem("masjidToken");

        if (!masjidId || !token) {
            navigate("/masjid/login");
            toast.error("Unauthorized access");
            return false;
        }

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/masjid/verify-token`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!response.data.valid) {
                throw new Error("Invalid token");
            }

            return true;
        } catch (err) {
            localStorage.removeItem("masjidID");
            localStorage.removeItem("masjidToken");
            navigate("/masjid/login");
            return false;
        }
    }, [navigate]);

    const fetchMasjidData = useCallback(async () => {
        const masjidId = localStorage.getItem("masjidID");
        const token = localStorage.getItem("masjidToken");

        if (!masjidId || !token) {
            navigate("/masjid/login");
            return;
        }

        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/masjid/selected/${masjidId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const masjid = res.data;
            setMasjidName(masjid.name);

            const updatedPrayerTimes = [
                { name: "Fajr", azaan: convertTo24Hour(masjid.fajr), iqamath: convertTo24Hour(masjid.fajrIqamath) },
                { name: "Zuhar", azaan: convertTo24Hour(masjid.zuhar), iqamath: convertTo24Hour(masjid.zuharIqamath) },
                { name: "Asar", azaan: convertTo24Hour(masjid.asar), iqamath: convertTo24Hour(masjid.asarIqamath) },
                { name: "Maghrib", azaan: convertTo24Hour(masjid.maghrib), iqamath: convertTo24Hour(masjid.maghribIqamath) },
                { name: "Isha", azaan: convertTo24Hour(masjid.isha), iqamath: convertTo24Hour(masjid.ishaIqamath) },
                { name: "Jummah", azaan: convertTo24Hour(masjid.jummah), iqamath: convertTo24Hour(masjid.jummahIqamath) },
            ];

            setPrayerTimes(updatedPrayerTimes);
            setNotice(masjid.announcements || '');
            setLastUpdate(masjid.lastUpdated || new Date().toISOString().slice(0, 10));
        } catch (err) {
            if (err.response?.status === 401) {
                handleLogout();
            }
            toast.error("Failed to load masjid data");
        }
    }, [navigate]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem("masjidID");
        localStorage.removeItem("masjidToken");
        toast.success("Logout successful!")
        navigate("/masjid/login");
    }, [navigate]);

    const formatTo12Hour = useCallback((timeStr) => {
        if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(":")) return "";
        const [hourStr, minuteStr] = timeStr.split(":");
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        if (isNaN(hour) || isNaN(minute)) return "";
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${formattedHour}:${minute.toString().padStart(2, "0")}`;
    }, []);

    const convertTo24Hour = (timeStr) => {
        if (!timeStr) return "00:00";
        if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr)) return timeStr;

        const timeParts = timeStr.split(' ');
        let [hours, minutes] = timeParts[0].split(':');
        const period = timeParts[1]?.toUpperCase();
        hours = parseInt(hours, 10);
        minutes = minutes || "00";
        if (period === "PM" && hours < 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        return `${hours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    };

    const handleUpdateTimes = useCallback(async () => {
        const masjidId = localStorage.getItem("masjidID");
        const token = localStorage.getItem("masjidToken");

        if (!masjidId || !token) {
            handleLogout();
            return;
        }

        try {
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/masjid/${masjidId}/times`,
                {
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
                    lastUpdated: new Date().toISOString(),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            await fetchMasjidData();
            setCurrentView("home");
            toast.success("Times updated successfully");
        } catch (err) {
            toast.error("Error updating times");
            if (err.response?.status === 401) handleLogout();
        }
    }, [prayerTimes, fetchMasjidData, handleLogout]);

    const handleNoticeAction = useCallback(async (action) => {
        const masjidId = localStorage.getItem("masjidID");
        const token = localStorage.getItem("masjidToken");

        if (!masjidId || !token) {
            handleLogout();
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/masjid/${masjidId}/${action === 'add' ? 'addannouncements' : 'removeannouncements'}`,
                action === 'add' ? { announcements: notice } : {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (action === 'remove') setNotice("");
            setCurrentView("home");
            toast.success(`Notice ${action === 'add' ? 'saved' : 'removed'} successfully`);
        } catch (err) {
            toast.error(`Error ${action === 'add' ? 'saving' : 'removing'} notice`);
            if (err.response?.status === 401) handleLogout();
        }
    }, [notice, handleLogout]);

    const handlePrayerTimeChange = useCallback((index, field, value) => {
        setPrayerTimes(prevTimes => prevTimes.map((time, i) =>
            i === index ? { ...time, [field]: value } : time
        ));
    }, []);

    const handleNoticeChange = useCallback((value) => {
        setNotice(value);
    }, []);

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12
        return `${hours}:${minutes} ${ampm}`;
    };

    const formatDateTime = (isoString) => {
        if (!isoString) return 'Not updated yet';

        const date = new Date(isoString);
        const now = new Date();

        // Check if same day (Today)
        if (date.toDateString() === now.toDateString()) {
            return 'Today - ' + formatTime(date);
        }

        // Check if yesterday
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday - ' + formatTime(date);
        }

        // Otherwise return full date
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();

        return `${dd}-${mm}-${yyyy} -- ${formatTime(date)}`;
    };

    useEffect(() => {
        const init = async () => {
            const isValid = await validateAuth();
            if (isValid) {
                await fetchMasjidData();
                setAuthChecked(true);
            }
            setLoading(false);
        };
        init();
    }, [validateAuth, fetchMasjidData]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!authChecked) return null;

    const HomeView = () => (
        <div className="max-w-md mx-auto px-4 py-6">
            <h1 className="text-2xl poppins font-bold text-gray-800 text-center mb-6">Current Timing</h1>
            <div className="bg-yellow-300 rounded-4xl px-8 py-8 mb-8">
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="font-extrabold text-indigo-900 text-lg dm-sans">NAMAZ</div>
                    <div className="font-bold text-indigo-900 text-lg text-center dm-sans">AZAAN</div>
                    <div className="font-bold text-indigo-900 text-lg text-center dm-sans">IQAMATH</div>
                </div>
                {prayerTimes.map((prayer, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3 py-2 poppins">
                        <div className="font-extrabold text-gray-800 text-lg dm-sans">{prayer.name}</div>
                        <div className="font-bold text-gray-800 text-xl text-center">{formatTo12Hour(prayer.azaan)}</div>
                        <div className="font-bold text-gray-800 text-xl text-center">{formatTo12Hour(prayer.iqamath)}</div>
                    </div>
                ))}
                <div className="text-center text-lg text-gray-700 mt-6 dm-sans">
                    Updated on: {formatDateTime(lastUpdate)} {/* no showing proper */}
                </div>
            </div>
            <div id="notice-section" className="scroll-mt-20">
                <h2 className="text-2xl poppins font-bold text-gray-800 text-center mb-6">Current Notice</h2>
                <div className="bg-yellow-300 rounded-4xl p-8 mb-24">
                    <div className="text-center">
                        <div className="text-lg font-medium text-gray-800 mb-8 dm-sans whitespace-pre-line">
                            {notice || "No Notice/Announcement"}
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setCurrentView('edit')}
                                className="dm-sans bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-2 rounded-full transition-colors"
                            >
                                {notice ? 'EDIT' : 'ADD NOTICE'}
                            </button>
                            {notice && (
                                <button
                                    onClick={() => handleNoticeAction('remove')}
                                    className="dm-sans bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-full transition-colors"
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

    return (
        <div className="min-h-screen bg-orange-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-md mx-auto px-4 py-0 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div>
                            <img className="w-20 h-20" src='/myMasjidTimes_Logo.png' alt="Logo" />
                        </div>
                        <div>
                            <div className="text-sm text-black hagrid mb-1">myMasjidTimes</div>
                            <div className="text-sm font-semibold poppins text-gray-800">
                                {masjidName || 'Loading...'}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 bg-yellow-400 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:bg-red-500 hover:text-white active:bg-red-500 transition-colors duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            </header>
            {currentView === 'home' ? (
                <HomeView />
            ) : (
                <EditView
                    prayerTimes={prayerTimes}
                    notice={notice}
                    onPrayerTimeChange={handlePrayerTimeChange}
                    onUpdateTimes={handleUpdateTimes}
                    onNoticeChange={handleNoticeChange}
                    onNoticeAction={handleNoticeAction}
                />
            )}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 rounded-full px-8 py-3 flex items-center space-x-6 shadow-lg">
                    <button
                        onClick={() => setCurrentView('home')}
                        className={`p-2 rounded-full transition-colors ${currentView === 'home' ? 'bg-yellow-500' : 'hover:bg-yellow-500'}`}
                    >
                        <Home size={24} className="text-gray-800" />
                    </button>
                    <button
                        onClick={() => setCurrentView('edit')}
                        className={`p-2 rounded-full transition-colors ${currentView === 'edit' ? 'bg-yellow-500' : 'hover:bg-yellow-500'}`}
                    >
                        <Edit3 size={24} className="text-gray-800" />
                    </button>
                </div>
            </div>
        </div>
    );
}