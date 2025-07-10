import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { ThreeDot } from 'react-loading-indicators';

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

    // Helper to convert time to 12-hour format
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


    if (!masjid) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ThreeDot variant="bounce" color="orange" size="small" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fef9ef]">
            {/* <Header /> */}
            <div className="px-4 pb-6 max-w-md mx-auto bg-[#fef9ef]">

                {/* Back Button */}
                <div className="text-left absolute cursor-pointer" onClick={() => navigate('/home')}>
                    <button
                        className="p-2 rounded-full absolute top-6 transition-colors bg-yellow-500 hover:bg-yellow-600 shadow m"
                    >
                        <ArrowLeft size={17} className="text-gray-800 top-5" />
                    </button>
                    <p className='text-md font-semibold poppins mt-7 ml-10'>{masjid.name}</p>
                </div>

                {/* Heading */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 poppins pt-24">Prayer Timings</h2>
                </div>

                {/* Prayer Timings Table */}
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
                                    <span className="font-bold text-gray-800 text-xl text-center">
                                        {convertTo12Hour(prayer.azaan)}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <span className="font-bold text-gray-800 text-xl text-center">
                                        {convertTo12Hour(prayer.iqamath)}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <ThreeDot variant="bounce" color="orange" size="small" />
                    )}
                </div>

                <div className="text-center my-6">
                    <h2 className="text-2xl font-bold text-gray-900 poppins">Notice</h2>
                </div>

                {/* Announcements Section */}
                {masjid.announcements ? (
                    <div className="bg-yellow-300 rounded-4xl p-8 mb-24">
                        <div className="text-left">
                            <div className="text-lg font-medium text-gray-800 mb-8 dm-sans whitespace-pre-line">
                                {masjid.announcements}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-300 rounded-4xl p-8 mb-24">
                        <div className="text-center">
                            <div className="text-lg font-medium text-gray-800 mb-8 dm-sans whitespace-pre-line">
                                No Notice/Announcement
                            </div>
                        </div>
                    </div>
                )}

                {/* <div className="text-center my-6">
                    <h2 className="text-2xl font-bold text-gray-900 poppins">Address</h2>
                </div> */}

                {/* Masjid Details */}
                {/* <div className="text-center">
                    <div className='mb-10'>
                        <h1 className="poppins text-lg font-semibold text-gray-900 pb-3">
                            {masjid.name}
                        </h1>
                        <h1 className="dm-sans text-lg font-semibold text-gray-900">
                            {masjid.address}
                        </h1>
                        <h1 className="dm-sans text-lg font-semibold text-gray-900 pb-2">
                            {masjid.town}
                        </h1>
                    </div>
                    <div> */}
                {/* <button
                    className="
                                ml-2 mt-4
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
                </button> */}
            </div>
        </div>
    );
}
