import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Star } from 'lucide-react';
import axios from 'axios';

const MasjidListPage = () => {
    const [masjids, setMasjids] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Fetch all masjids
    useEffect(() => {
        const fetchMasjids = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/masjid/allmasjids`);
                setMasjids(res.data || []);
            } catch (error) {
                console.error("Failed to load masjid list", error);
            }
        };

        // Load favorites from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteMasjids')) || [];
        setFavorites(savedFavorites);

        fetchMasjids();
    }, []);

    // Toggle favorite
    const toggleFavorite = (id) => {
        let updatedFavorites;
        if (favorites.includes(id)) {
            updatedFavorites = favorites.filter(fav => fav !== id);
        } else {
            updatedFavorites = [...favorites, id];
        }

        setFavorites(updatedFavorites);
        localStorage.setItem('favoriteMasjids', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="min-h-screen bg-[#fef9ef] flex flex-col">
            <Header />

            {/* Masjid List */}
            <div className="flex-1 px-4 py-6">
                <h1 className="text-2xl ml-2 font-bold text-black mb-8 poppins">Masjids in Vaniyambadi</h1>

                <div className="space-y-4 mb-30">
                    {masjids.map((masjid) => (
                        <div
                            key={masjid.id}
                            className="bg-yellow-200 p-4 rounded-2xl flex items-center justify-between dm-sans"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 flex items-center justify-center">
                                    <img src="/Masjid_list_logo.png" alt="masjid" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-black">{masjid.name}</h3>
                                    <p className="text-sm text-black">{masjid.address}, {masjid.town}</p>
                                </div>
                            </div>
                            <div
                                className="w-6 h-6 flex items-center justify-center cursor-pointer"
                                onClick={() => toggleFavorite(masjid.id)}
                            >
                                <Star
                                    className={favorites.includes(masjid.id) ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MasjidListPage;
