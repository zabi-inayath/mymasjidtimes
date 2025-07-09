import React from 'react';
import Header from './Header';
import { CodeXml } from 'lucide-react';

const AboutPage = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        {/* About Content */}
        <div className="flex-1 px-4 py-6 mb-30">
            <h1 className="text-3xl font-bold text-black mb-8 ml-2 poppins">About <span className='hagrid text-2xl'>myMasjidTimes</span> </h1>

            <div className="bg-yellow-200 p-6 rounded-2xl mb-8">
                <p className="text-black text-center leading-relaxed">
                    <span className='hagrid'>myMasjidTimes</span> is a web app that helps Muslims easily access prayer times for all local masjids, ensuring they never miss praying in congregation jamath. It also guides users to the nearest masjid with an upcoming jamath if they're unsure where to go. <br /><br /> Additionally, the app allows users to stay updated with masjid announcements, access Quran tafseer sessions, and view scheduled bayans—keeping them connected to their local Muslim community.
                </p>
                <br />
                <p className="text-black text-center leading-relaxed">
                    We're starting in Vaniyambadi, but in sha' Allah, we aim to grow and serve
                    many more cities in the future!
                </p>
                <br />
                <p className="text-black text-center text-sm">
                    Developed with love by <a className='underline hover:text-yellow-800' href='https://instagram.com/zabi_inayath'>zabi_inayath</a>
                </p>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-black mb-4">Meet Developer</h2>
                <div className="bg-gray-600 p-4 rounded-2xl flex gap-2 items-center justify-between dm-sans">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <img className='rounded-3xl' src='/dev_profile.png' />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Syed Zabiullah</h3>
                        </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <CodeXml className='text-white'/>
                    </div>
                </div>
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