import React from 'react';
import Header from './Header';
import { Star } from 'lucide-react';

const MasjidListPage = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        {/* Masjid List */}
        <div className="flex-1 px-4 py-6">
            <div className="space-y-4 mb-30">
                <div className="bg-yellow-200 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <img src='/Masjid_list_logo.png' />
                        </div>
                        <div>
                            <h3 className="font-bold text-black">Masjid e Khaderpet</h3>
                            <p className="text-sm text-black">Khaderpet, VNB</p>
                        </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <Star />
                    </div>
                </div>

                <div className="bg-yellow-200 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <img src='/Masjid_list_logo.png' />
                        </div>
                        <div>
                            <h3 className="font-bold text-black">Masjid e Kareemabad</h3>
                            <p className="text-sm text-black">Kareemabad, VNB</p>
                        </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <Star />
                    </div>
                </div>

                <div className="bg-yellow-200 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <img src='/Masjid_list_logo.png' />
                        </div>
                        <div>
                            <h3 className="font-bold text-black">Masjid e Fatah</h3>
                            <p className="text-sm text-black">Fari, VNB</p>
                        </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <Star />
                    </div>
                </div>

                <div className="bg-yellow-200 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <img src='/Masjid_list_logo.png' />
                        </div>
                        <div>
                            <h3 className="font-bold text-black">Masjid e Khaderpet</h3>
                            <p className="text-sm text-black">Khaderpet, VNB</p>
                        </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <Star />
                    </div>
                </div>

                <div className="bg-yellow-200 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <img src='/Masjid_list_logo.png' />
                        </div>
                        <div>
                            <h3 className="font-bold text-black">Masjid e Taqwa</h3>
                            <p className="text-sm text-black">Basheerbagh, VNB</p>
                        </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <Star />
                    </div>
                </div>

                <div className="bg-yellow-200 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <img src='/Masjid_list_logo.png' />
                        </div>
                        <div>
                            <h3 className="font-bold text-black">Masjid e Jadeed</h3>
                            <p className="text-sm text-black">Muslimpur, VNB</p>
                        </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <Star />
                    </div>
                </div>

                <div className="bg-yellow-200 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <img src='/Masjid_list_logo.png' />
                        </div>
                        <div>
                            <h3 className="font-bold text-black">Masjid e Khadeem</h3>
                            <p className="text-sm text-black">Muslimpur, VNB</p>
                        </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <Star />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default MasjidListPage;