import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

export default function PrayerTimesPage() {
    const { id } = useParams();
    const [masjid, setMasjid] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMasjid = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/masjid/selected/${id}`);
                setMasjid(res.data);
            } catch (error) {
                console.error("Error loading masjid details", error);
            }
        };

        if (id) fetchMasjid();
    }, [id]);

    // Use dynamic prayer times if available
    const prayerTimes = masjid ? [
        { name: 'Fajr', azaan: masjid.fajr, iqamath: masjid.fajrIqamath },
        { name: 'Zuhar', azaan: masjid.zuhar, iqamath: masjid.zuharIqamath },
        { name: 'Asar', azaan: masjid.asar, iqamath: masjid.asarIqamath },
        { name: 'Maghrib', azaan: masjid.maghrib, iqamath: masjid.maghribIqamath },
        { name: 'Isha', azaan: masjid.isha, iqamath: masjid.ishaIqamath },
        { name: 'Jummah', azaan: masjid.jummah, iqamath: masjid.jummahIqamath }
    ] : [];

    function convertTo12Hour(timeStr) {
        if (!timeStr) return "-";

        const [hourStr, minuteStr] = timeStr.split(":");
        let hour = parseInt(hourStr, 10);
        const minute = minuteStr;
        const ampm = hour >= 12 ? "PM" : "AM";

        hour = hour % 12;
        if (hour === 0) hour = 12;

        return `${hour}:${minute}`;
    }


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="px-6 py-6 max-w-lg mx-auto">
                <div className="text-left mb-6 flex gap-6">
                    <div>
                        <h1 className="poppins text-lg font-semibold text-gray-900 pb-3">
                            {masjid ? masjid.name : "Loading..."}
                        </h1>
                        <h1 className="dm-sans text-xs font-semibold text-gray-900">
                            {masjid ? masjid.address : "Loading..."}
                        </h1>
                        <h1 className="dm-sans text-xs font-semibold text-gray-900 pb-2">
                            {masjid ? masjid.town : "Loading..."}
                        </h1>
                    </div>
                    <div>
                        <button
                            className="
    ml-1 mt-4
    bg-yellow-400
    hover:bg-yellow-500
    text-gray-900
    font-semibold
    py-2 px-4
    rounded-full
    shadow
    transition-colors duration-300
  "
                        >
                            Get Directions
                        </button>

                    </div>

                </div>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 poppins">Prayer Timings</h2>
                </div>

                <div className="bg-yellow-300 rounded-4xl px-8 py-8 mb-8">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-left">
                            <span className="font-extrabold text-indigo-900 text-lg dm-sans">NAMAZ</span>
                        </div>
                        <div className="text-center">
                            <span className="font-bold text-indigo-900 text-lg text-center dm-sans">AZAAN</span>
                        </div>
                        <div className="text-center">
                            <span className="font-bold text-indigo-900 text-lg text-center dm-sans">IQAMAH</span>
                        </div>
                    </div>

                    {prayerTimes.length > 0 ? (
                        prayerTimes.map((prayer, index) => (
                            <div key={index} className="grid grid-cols-3 gap-3 py-2 poppins">
                                <div className="text-left">
                                    <span className="font-extrabold text-gray-800 text-lg dm-sans">{prayer.name}</span>
                                </div>
                                <div className="text-center">
                                    <span className="font-bold text-gray-800 text-xl text-center">{convertTo12Hour(prayer.azaan) || "-"}</span>
                                </div>
                                <div className="text-center">
                                    <span className="font-bold text-gray-800 text-xl text-center">{convertTo12Hour(prayer.iqamath) || "-"}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-black">Loading timings...</p>
                    )}
                </div>
            </div>
            <div className="text-center mb-20">

                <button
                    onClick={() => navigate('/home')}
                    className={`p-2 rounded-full transition-colors bg-yellow-500`}
                >
                    <ArrowLeft size={37} className="text-gray-800" />
                </button>

            </div>
        </div>
    );
}
