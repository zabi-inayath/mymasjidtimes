import React from 'react';
import Header from './Header';

const LearningsPage = () => (
    <div className="min-h-screen bg-[#fef9ef] flex flex-col">
        <Header />

        {/* Learnings Content */}
        <div className="flex-1 px-4 py-6">
            <h1 className="text-3xl font-bold text-black mb-8 ml-2 poppins">Learnings</h1>

            <div className="bg-yellow-200 p-8 rounded-2xl">
                <h2 className="text-xl font-bold text-black mb-8 text-center dm-sans">Coming soon</h2>
                <div className="space-y-4">
                    <div className="bg-white h-4 rounded-full"></div>
                    <div className="bg-white h-4 rounded-full"></div>
                    <div className="bg-white h-4 rounded-full"></div>
                    <div className="bg-white h-4 rounded-full"></div>
                    <div className="bg-white h-4 rounded-full"></div>
                    <div className="bg-white h-4 rounded-full"></div>
                    <div className="bg-white h-4 rounded-full w-3/4"></div>
                </div>
            </div>
        </div>
    </div>
);

export default LearningsPage;