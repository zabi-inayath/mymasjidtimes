import React, { useEffect, useState } from 'react';
import Header from './Header';
import { ChevronRight } from 'lucide-react';
import moment from 'moment-hijri';
import axios from 'axios';
import { ThreeDot } from 'react-loading-indicators';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [hijriDate, setHijriDate] = useState('');
    const [time, setTime] = useState('');
    const [nextPrayer, setNextPrayer] = useState('');
    const [nextPrayerTime, setNextPrayerTime] = useState('');
    const [masjids, setMasjids] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const prayers = [
        { name: 'Isha', time: '19:10', displayTime: '8:04 PM' },
        { name: 'Maghrib', time: '17:30', displayTime: '6:46 PM' },
        { name: 'Asar', time: '15:00', displayTime: '3:45 PM' },
        { name: 'Zohar', time: '06:30', displayTime: '12:21 PM', fridayName: 'Jummah' },
        { name: 'Sunrise', time: '05:30', displayTime: '5:56 AM' },
        { name: 'Fajr', time: '22:00', displayTime: '4:38 AM' },
    ];

    const formatTime12h = (timeStr) => {
        if (!timeStr || timeStr === "00:00") return "N/A";
        const [hour, minute] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
        });
    };

    let hijriDay = '';
    let hijriMonth = '';
    let hijriYear = '';

    if (hijriDate) {
        const parts = hijriDate.split(' ');
        hijriDay = parts[0] || '';
        hijriMonth = (parts[1] || '').replace(',', '');
        hijriYear = parts[2] || '';
    }

    useEffect(() => {
        const update = () => {
            const now = moment().locale('en');
            const hijriDay = now.format('iD');
            const hijriMonth = now.format('iMMMM');
            const hijriYear = now.format('iYYYY');
            const currentTime = now.format('hh:mm:ss A');
            setHijriDate(`${hijriDay} ${hijriMonth}, ${hijriYear}`);
            setTime(currentTime);

            const nowTime24 = now.format('HH:mm');
            let matchedPrayer = prayers.find((prayer) => nowTime24 >= prayer.time);

            if (!matchedPrayer) {
                matchedPrayer = prayers[prayers.length - 1];
            }

            if (
                matchedPrayer.name === 'Zohar' &&
                now.format('dddd') === 'Friday'
            ) {
                setNextPrayer('Jummah');
            } else {
                setNextPrayer(matchedPrayer.name);
            }

            setNextPrayerTime(matchedPrayer.displayTime);
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchMasjids = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/masjid/earliestnamaz`);
                setMasjids(res.data || []);
            } catch (error) {
                console.error('Failed to load masjid list', error);
            } finally {
                setLoading(false);
            }
        };

        setTimeout(() => {
            fetchMasjids();
        }, 500);

    }, []);

    const prayerFieldMap = {
        Fajr: 'fajrIqamath',
        Zohar: 'zuharIqamath',
        Jummah: 'jummahIqamath',
        Asar: 'asarIqamath',
        Maghrib: 'maghribIqamath',
        Isha: 'ishaIqamath'
    };

    let displayedPrayer = nextPrayer === 'Jummah' ? 'Jummah' : nextPrayer;

    let masjidsForCurrentPrayer = [];
    if (masjids.length > 0 && displayedPrayer) {
        const timeField = prayerFieldMap[displayedPrayer];

        masjidsForCurrentPrayer = masjids
            .filter((m) => m[timeField] && m[timeField] !== "00:00" && m[timeField] !== null)
            .map((m) => ({
                id: m.id,
                name: m.name,
                time: formatTime12h(m[timeField])
            }))
            .sort((a, b) => {
                const toMinutes = (time) => {
                    if (time === "N/A") return Infinity;
                    const [h, m] = time.match(/(\d+):(\d+) (\w+)/).slice(1);
                    let hour = parseInt(h, 10);
                    const minute = parseInt(m, 10);
                    return hour * 60 + minute;
                };

                return toMinutes(a.time) - toMinutes(b.time);
            });
    }

    const handleClick = (id) => {
        navigate(`/masjid-timing/${id}`);
    };

    return (
        <div className="min-h-screen bg-[#fef9ef] flex flex-col">
            <Header />

            <div className="flex-1 px-4 py-6">
                <h1 className="text-3xl text-black mb-4 ml-2 league-spartan">Salam, Akhi</h1>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-yellow-400 p-6 rounded-2xl">
                        <h2 className="text-xl text-black mt-6 mb-4 league-spartan">Next</h2>
                        <h2 className="text-2xl text-black -ml-1 league-spartan">{nextPrayer}</h2>
                        <p className="text-black text-sm font-medium league-spartan">
                            {nextPrayerTime}
                        </p>
                    </div>
                    <div className="bg-yellow-400 py-6 px-4 rounded-2xl text-center">
                        <h2 className="text-xl text-black mb-1 league-spartan">
                            {hijriDay && `${hijriDay}th`}
                        </h2>
                        <h2 className="text-xl text-black mb-1 league-spartan">
                            {hijriMonth && `${hijriMonth},`}
                        </h2>
                        <h2 className="text-xl text-black mb-5 league-spartan">
                            {hijriYear}
                        </h2>
                        <p className="text-black text-lg league-spartan">{time}</p>
                    </div>
                </div>

                <h3 className="text-2xl text-black mb-4 ml-2 league-spartan">
                    {displayedPrayer} in Vaniyambadi
                </h3>

                <div className="bg-[#ffde59] py-4 px-2 rounded-2xl mb-40">
                    {loading ? (
                        <div className="flex justify-center mt-10">
                            <ThreeDot variant="bounce" color="orange" size="small" />
                        </div>
                    ) : masjidsForCurrentPrayer.length > 0 ? (
                        <div className="space-y-1">
                            {masjidsForCurrentPrayer.map((masjid, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center text-lg cursor-pointer hover:bg-yellow-500 px-3 rounded-full"
                                    onClick={() => handleClick(masjid.id)}
                                >
                                    <span className="text-black font-medium poppins p-1">
                                        {masjid.name}
                                    </span>
                                    <div className="flex items-center gap-2 poppins">
                                        <span className="text-black font-bold">
                                            - {masjid.time}
                                        </span>
                                        <ChevronRight />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-700 text-center">
                            No masjid timings available for {displayedPrayer}.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
