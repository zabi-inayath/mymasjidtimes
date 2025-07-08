import React from 'react';
import Header from './Header';

const AboutPage = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        {/* About Content */}
        <div className="flex-1 px-4 py-6">
            <h1 className="text-3xl font-bold text-black mb-8">About myMasjidTimes</h1>

            <div className="bg-yellow-200 p-6 rounded-2xl mb-8">
                <p className="text-black text-center leading-relaxed">
                    myMasjidTimes helps Muslims stay connected with local masjid prayer times,
                    Masjid updates, and daily reminders from the Quran and hadith.
                </p>
                <br />
                <p className="text-black text-center leading-relaxed">
                    We're starting in Vaniyambadi, but in sha' Allah, we aim to grow and serve
                    many more cities in the future!
                </p>
                <br />
                <p className="text-black text-center text-sm italic">
                    Developed with love by zabi_inayath
                </p>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-black mb-4">Contact</h2>
                <p className="text-black mb-2">
                    We welcome your feedback, suggestions, or collaboration ideas!
                </p>
                <p className="text-black font-medium">
                    mymasjidtimes@gmail.com
                </p>
            </div>
        </div>
    </div>
);

export default AboutPage;