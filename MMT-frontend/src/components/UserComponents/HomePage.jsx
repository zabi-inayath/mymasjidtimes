import React from 'react';
import Header from './Header';
import { ChevronRight } from 'lucide-react';

const HomePage = () => (
    <div className="min-h-screen bg-[#fef9ef] flex flex-col">
        <Header />

        {/* Main Content */}
        <div className="flex-1 px-4 py-6">
            <h1 className="text-3xl text-black mb-4 ml-2 league-spartan">Salam, Akhi</h1>

            {/* Prayer Time Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-yellow-400 p-6 rounded-2xl">
                    <h2 className="text-xl text-black mt-6 mb-4 league-spartan">Next</h2>
                    <h2 className="text-2xl text-black  -ml-1 league-spartan">Zohar</h2>
                    <p className="text-black text-sm font-medium league-spartan">12:21 PM</p>
                </div>
                <div className="bg-yellow-400 p-6 rounded-2xl text-center">
                    <h2 className="text-xl text-black mb-1 league-spartan">9th</h2>
                    <h2 className="text-xl text-black mb-1 league-spartan">Muharram,</h2>
                    <h2 className="text-xl text-black mb-5 league-spartan">1447</h2>
                    <p className="text-bladk text-lg league-spartan">01:49:40 PM</p>
                </div>
            </div>

            {/* Zohar in Vaniyambadi */}
            <h3 className="text-2xl text-black mb-4 ml-2 league-spartan">Zohar in Vaniyambadi</h3>
            <div className="bg-yellow-200 p-4 rounded-2xl mb-40">
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-lg">
                        <span className="text-black font-medium poppins">Masjid e Mubarak</span>
                        <div className="flex items-center gap-2">
                            <span className="text-black">- 1.05 PM</span>
                            <ChevronRight />
                        </div>
                    </div>
                    <div className="flex justify-between items-center poppins text-lg">
                        <span className="text-black font-medium">Masjid e Kareemabad</span>
                        <div className="flex items-center gap-2">
                            <span className="text-black">- 1.15 PM</span>
                            <ChevronRight />
                        </div>
                    </div>
                    <div className="flex justify-between items-center poppins text-lg">
                        <span className="text-black  font-medium">Masjid e Khaderpet</span>
                        <div className="flex items-center gap-2">
                            <span className="text-black dm-sans">- 1.30 PM</span>
                            <ChevronRight />
                        </div>
                    </div>
                    <div className="flex justify-between items-center poppins text-lg">
                        <span className="text-black font-medium">Masjid e Fatah</span>
                        <div className="flex items-center gap-2">
                            <span className="text-black">- 1.45 PM</span>
                            <ChevronRight />
                        </div>
                    </div>
                    <div className="flex justify-between items-center poppins text-lg">
                        <span className="text-black font-medium">Masjid e Taqwa</span>
                        <div className="flex items-center gap-2">
                            <span className="text-black">- 2.25 PM</span>
                            <ChevronRight />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default HomePage;