import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { ArrowLeft} from 'lucide-react';

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

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="px-6 py-6 max-w-lg mx-auto">
                <div className="text-left mb-6 flex gap-10">
                    <div>
                        <h1 className="poppins text-xl font-semibold text-gray-900 pb-2">
                            {masjid ? masjid.name : "Loading..."}
                        </h1>
                        <h1 className="dm-sans text-sm font-semibold text-gray-900">
                            {masjid ? masjid.address : "Loading..."}
                        </h1>
                        <h1 className="dm-sans text-sm font-semibold text-gray-900 pb-2 inline-block">
                            {masjid ? masjid.town : "Loading..."}
                        </h1>
                    </div>
                    <div>
                        <button className='ml-10 mt-4'>Head to Masjid</button>
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
                                    <span className="font-bold text-gray-800 text-xl text-center">{prayer.azaan || "-"}</span>
                                </div>
                                <div className="text-center">
                                    <span className="font-bold text-gray-800 text-xl text-center">{prayer.iqamath || "-"}</span>
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
