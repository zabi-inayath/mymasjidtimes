import React, { useEffect, useState } from 'react';
import Header from './Header';
import { ChevronRight } from 'lucide-react';
import moment from 'moment-hijri';
import axios from 'axios';
import { ThreeDot } from 'react-loading-indicators';

const HomePage = () => {
    const [hijriDate, setHijriDate] = useState('');
    const [time, setTime] = useState('');
    const [nextPrayer, setNextPrayer] = useState('');
    const [nextPrayerTime, setNextPrayerTime] = useState('');
    const [masjids, setMasjids] = useState([]);
    const [loading, setLoading] = useState(true);

    const prayers = [
        { name: 'Isha', time: '19:10', displayTime: '8:04 PM' },
        { name: 'Maghrib', time: '17:30', displayTime: '6:46 PM' },
        { name: 'Asar', time: '15:00', displayTime: '3:45 PM' },
        { name: 'Zohar', time: '06:30', displayTime: '12:21 PM', fridayName: 'Jummah' },
        { name: 'Sunrise', time: '05:30', displayTime: '5:56 AM' },
        { name: 'Fajr', time: '22:00', displayTime: '4:38 AM' },
    ];

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
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/masjid/namazearliest`);
                setMasjids(res.data || []);
            } catch (error) {
                console.error('Failed to load masjid list', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMasjids();
    }, []);

    const prayerFieldMap = {
        Fajr: 'fajr',
        Zohar: 'zuhar',
        Jummah: 'jummah',
        Asar: 'asar',
        Maghrib: 'maghrib',
        Isha: 'isha'
    };

    let displayedPrayer = nextPrayer === 'Jummah' ? 'Jummah' : nextPrayer;

    let masjidsForCurrentPrayer = [];
    if (masjids.length > 0 && displayedPrayer) {
        const timeField = prayerFieldMap[displayedPrayer];

        masjidsForCurrentPrayer = masjids
            .filter((m) => m[timeField])
            .map((m) => ({
                name: m.name,
                address: m.address,
                town: m.town,
                time: m[timeField]
            }))
            .sort((a, b) => {
                const timeA = a.time || "00:00";
                const timeB = b.time || "00:00";
                const [hA, mA] = timeA.split(':').map(Number);
                const [hB, mB] = timeB.split(':').map(Number);
                return hA !== hB ? hA - hB : mA - mB;
            });
    }

    return (
        <div className="min-h-screen bg-[#fef9ef] flex flex-col">
            <Header />

            <div className="flex-1 px-4 py-6">
                <h1 className="text-3xl text-black mb-4 ml-2 league-spartan">Salam, Akhi</h1>

                {/* Prayer Time Cards */}
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

                {/* Dynamic Prayer Listing */}
                <h3 className="text-2xl text-black mb-4 ml-2 league-spartan">
                    {displayedPrayer} in Vaniyambadi
                </h3>

                <div className="bg-yellow-200 p-4 rounded-2xl mb-40">
                    {loading ? (
                        <div className="flex justify-center mt-10">
                            <ThreeDot variant="pulsate" color="orange" size="large" />
                        </div>
                    ) : masjidsForCurrentPrayer.length > 0 ? (
                        <div className="space-y-3">
                            {masjidsForCurrentPrayer.map((masjid, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center text-lg"
                                >
                                    <span className="text-black font-medium poppins">
                                        {masjid.name}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-black">
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
