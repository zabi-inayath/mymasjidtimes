import React, { useEffect, useState } from 'react';
import Header from './Header';
import { ChevronRight } from 'lucide-react';
import moment from 'moment-hijri';

const HomePage = () => {
    const [hijriDate, setHijriDate] = useState('');
    const [time, setTime] = useState('');
    const [nextPrayer, setNextPrayer] = useState('');
    const [nextPrayerTime, setNextPrayerTime] = useState('');

    const prayers = [
        {
            name: 'Isha',
            time: '19:10', // 7:10 PM
            displayTime: '8:04 PM',
        },
        {
            name: 'Maghrib',
            time: '17:30', // 5:30 PM
            displayTime: '6:46 PM',
        },
        {
            name: 'Asar',
            time: '15:00', // 3:00 PM
            displayTime: '3:45 PM',
        },
        {
            name: 'Zohar',
            time: '07:30', // 7:30 AM
            displayTime: '12:21 PM',
            fridayName: 'Jummah',
        },
        {
            name: 'Sunrise',
            time: '05:30', // 5:30 AM
            displayTime: '5:56 AM',
        },
        {
            name: 'Fajr',
            time: '22:00', // 10:00 PM
            displayTime: '4:38 AM',
        },
    ];

    // Parse Hijri date parts safely
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
                // If none matched, it’s before Fajr, so show Fajr as next
                matchedPrayer = prayers[prayers.length - 1];
            }

            // Special check for Friday
            if (
                matchedPrayer.name === 'Zuhar' &&
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
                    <div className="bg-yellow-400 p-6 rounded-2xl text-center">
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

                <h3 className="text-2xl text-black mb-4 ml-2 league-spartan">Zohar in Vaniyambadi</h3>

                <div className="bg-yellow-200 p-4 rounded-2xl mb-40">
                    <div className="space-y-3">
                        {[
                            { name: "Masjid e Mubarak", time: "1.05 PM" },
                            { name: "Masjid e Kareemabad", time: "1.15 PM" },
                            { name: "Masjid e Khaderpet", time: "1.30 PM" },
                            { name: "Masjid e Fatah", time: "1.45 PM" },
                            { name: "Masjid e Taqwa", time: "2.25 PM" },
                        ].map((masjid, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center text-lg"
                            >
                                <span className="text-black font-medium poppins">
                                    {masjid.name}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-black">- {masjid.time}</span>
                                    <ChevronRight />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
