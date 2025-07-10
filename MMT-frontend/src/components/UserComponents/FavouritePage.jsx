import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Star, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDot } from 'react-loading-indicators';

const FavouritePage = () => {
    const [favorites, setFavorites] = useState([]);
    const [masjids, setMasjids] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            const storedFavs = JSON.parse(localStorage.getItem('favoriteMasjids')) || [];

            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/masjid/allmasjids`);
                const allMasjids = res.data || [];

                // Filter only favorites
                const favMasjids = allMasjids.filter((masjid) =>
                    storedFavs.includes(masjid.id)
                );

                setMasjids(favMasjids);
                setFavorites(storedFavs);
            } catch (error) {
                console.error("Failed to load masjid list", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const removeFavorite = (id) => {
        const updatedFavorites = favorites.filter((favId) => favId !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favoriteMasjids', JSON.stringify(updatedFavorites));

        // Also remove from displayed masjids
        setMasjids((prev) => prev.filter((m) => m.id !== id));
    };

    const goToMasjidTiming = (id) => {
        navigate(`/masjid-timing/${id}`);
    };
    

    return (
        <div className="min-h-screen bg-[#fef9ef] flex flex-col">
            <Header />

            <div className="flex-1 px-4 py-6">
                <h1 className="text-3xl font-bold text-black mb-8 ml-2 poppins">Favourite</h1>

                {loading ? (
                    <div className="flex justify-center mt-20">
                        <ThreeDot variant="bob" color="orange" size="medium" />
                    </div>
                ) : masjids.length === 0 ? (
                    <p className="text-gray-700 text-center mt-10">
                        No favourites added yet
                    </p>
                ) : (
                    <div className="space-y-4">
                        {masjids.map((masjid) => (
                            <div
                                key={masjid.id}
                                className="bg-yellow-200 p-4 rounded-2xl flex items-center justify-between dm-sans cursor-pointer"
                                onClick={() => goToMasjidTiming(masjid.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 flex items-center justify-center">
                                        <img src='/Masjid_list_logo.png' alt="masjid" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-black">{masjid.name}</h3>
                                        <p className="text-sm text-black">
                                            {masjid.address}, {masjid.town}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="w-6 h-6 flex items-center justify-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFavorite(masjid.id);
                                    }}
                                >
                                    <Trash2 className="text-red-600 hover:text-red-800 cursor-pointer" size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavouritePage;
