import React from 'react';
import Header from './Header';
import { CodeXml } from 'lucide-react';

const AboutPage = () => (
    <div className="min-h-screen bg-[#fef9ef] flex flex-col">
        <Header />

        {/* About Content */}
        <div className="flex-1 px-4 py-6 mb-30">
            <h1 className="text-3xl font-bold text-black mb-8 ml-2 poppins">About <span className='hagrid text-2xl'>myMasjidTimes</span> </h1>

            <div className="bg-yellow-200 p-6 rounded-2xl mb-8 text-left dm-sans font-medium">
                <p className="text-black leading-relaxed">
                    <span className='hagrid text-lg font-semibold'>myMasjidTimes</span> is a web app that helps Muslims easily access prayer times for all local masjids, ensuring they never miss praying in congregation jamath. It also guides users to the nearest masjid with an upcoming jamath if they're unsure where to go. <br /><br /> Additionally, the app allows users to stay updated with masjid announcements, access Quran tafseer sessions, and view scheduled bayans—keeping them connected to their local Muslim community.
                </p>
                <br />
                <p className="text-black leading-relaxed">
                    We're starting in Vaniyambadi, but in sha' Allah, we aim to grow and serve
                    many more cities in the future!
                </p>
                <br />
                <p className="text-black text-center text-sm league-spartan">
                    Developed with love by <a className='underline hover:text-yellow-800' href='https://instagram.com/zabi_inayath'>zabi_inayath</a>
                </p>
            </div>

            <h2 className="text-3xl font-bold text-black  mb-8 ml-2 poppins">Meet Developer</h2>
            <div className="text-center">
                <div className="bg-gray-600 mb-8 p-4 rounded-2xl flex gap-2 items-center justify-between dm-sans">
                    <div className="flex items-center gap-3">
                        <div className="w-16 h-16 flex items-center justify-center">
                            <img className='rounded-4xl size-15' src='/dev_profile.png' />
                        </div>
                        <div className='text-left'>
                            <h3 className="mb-2 text-white text-2xl hagrid">Syed Zabiullah</h3>
                            {/* <p className="text-sm underline text-white"><a className='underline hover:text-yellow-600' href='https://zabinayath.space'>Visit portfolio</a></p> */}
                            <div className='flex gap-3 text-white text-2xl'>
                                <a href="https://github.com/zabi-inayath"><i className="fa-brands fa-github hover:text-black"></i></a>
                                <a href="https://www.linkedin.com/in/zabi-inayath/"><i className="fa-brands fa-linkedin hover:text-black"></i></a>
                                <a href="https://x.com/zabi_inayath"><i className="fa-brands fa-square-x-twitter hover:text-black"></i></a>
                                <a href="https://www.zabinayath.space"><i
                                    className="fa-brands fa-square-instagram hover:text-black"></i></a>
                            </div>

                        </div>
                    </div>
                    <div className="w-12 h-12 flex items-center justify-center mr-2">
                        <CodeXml className='h-8 w-8 text-white' />
                    </div>
                </div>

                <h2 className="text-3xl text-left font-bold text-black  mb-8 ml-2 poppins">Contact</h2>

                <div className="bg-yellow-200 p-6 rounded-2xl mb-8">
                    <p className="text-black text-left text-2xl dm-sans leading-relaxed">
                        We welcome your feedback, suggestions, or collaboration ideas!
                    </p>
                    <br />
                    <p className="text-black text-left text-xl dm-sans text-center leading-relaxed">
                        mymasjidtimes@gmail.com
                    </p>

                    <form className="mt-6 space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-2 rounded-lg bg-white text-gray-700 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full px-4 py-2 rounded-lg bg-white text-gray-700 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg bg-white text-gray-700 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-xl transition-colors duration-300"
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

export default AboutPage;