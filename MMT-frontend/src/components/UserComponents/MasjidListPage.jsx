import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Star, Search } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDot } from 'react-loading-indicators';
import { motion, AnimatePresence } from 'framer-motion';


const MasjidListPage = () => {
    const [masjids, setMasjids] = useState([]);
    const [filteredMasjids, setFilteredMasjids] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMasjids = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/masjid/allmasjids`);
                setMasjids(res.data || []);
                setFilteredMasjids(res.data || []);
            } catch (error) {
                console.error("Failed to load masjid list", error);
            } finally {
                setLoading(false);
            }
        };

        const savedFavorites = JSON.parse(localStorage.getItem('favoriteMasjids')) || [];
        setFavorites(savedFavorites);

        setTimeout(() => {
            fetchMasjids();
        }, 1000);

    }, []);

    const listVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05, // stagger effect
                duration: 0.4,
                ease: "easeOut"
            }
        }),
    };

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

    const goToMasjidTiming = (id) => {
        navigate(`/masjid-timing/${id}`);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = masjids.filter((masjid) => {
            return (
                masjid.name?.toLowerCase().includes(query) ||
                masjid.address?.toLowerCase().includes(query) ||
                masjid.town?.toLowerCase().includes(query)
            );
        });

        setFilteredMasjids(filtered);
    };

    const sortedMasjids = [...filteredMasjids].sort((a, b) =>
        a.name.localeCompare(b.name)
    );


    return (
        <div className="min-h-screen bg-[#fef9ef] flex flex-col">
            <Header />

            <div className="flex-1 px-4 py-6 mb-25">
                <h1 className="text-2xl ml-2 font-bold text-black mb-8 poppins">Masjids in Vaniyambadi</h1>

                {/* Search Bar */}
                <div className="mb-6 relative max-w-md">
                    <Search className="absolute left-3 top-3 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search for masjid by name or area"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="
                            pl-10 pr-4 py-2 w-full
                            rounded-full border border-gray-300
                            focus:outline-none focus:ring-2 focus:ring-yellow-400
                            text-gray-800 dm-sans
                        "
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center mt-20">
                        <ThreeDot variant="bounce" color="orange" size="small" />
                    </div>
                ) : (
                    <AnimatePresence>
                        {sortedMasjids.map((masjid, index) => (
                            <motion.div
                                key={masjid.id}
                                className="bg-[#ffde59] p-4 rounded-2xl mb-4 flex items-center justify-between dm-sans cursor-pointer"
                                onClick={() => goToMasjidTiming(masjid.id)}
                                variants={listVariants}
                                initial="hidden"
                                animate="visible"
                                custom={index}
                                exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 flex items-center justify-center">
                                        <img src="/Masjid_list_logo.png" alt="masjid" />
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
                                        toggleFavorite(masjid.id);
                                    }}
                                >
                                    <Star
                                        className={
                                            favorites.includes(masjid.id)
                                                ? "text-[#f04760] fill-[#f04760]"
                                                : "text-gray-600"
                                        }
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                )}
            </div>
        </div>
    );
};

export default MasjidListPage;
