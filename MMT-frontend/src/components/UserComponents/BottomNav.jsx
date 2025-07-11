import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Star, Book, ListCollapse, Info } from 'lucide-react';

const BottomNav = () => {
    const location = useLocation();

    const navItems = [
        { to: '/home', icon: <Home size={24} className="text-gray-800" />, label: 'Home', key: 'home' },
        { to: '/masjids', icon: <ListCollapse size={24} className="text-gray-800" />, label: 'Masjids', key: 'masjid' },
        { to: '/favorite', icon: <Star size={24} className="text-gray-800" />, label: 'Fav', key: 'favourite' },
        { to: '/learn', icon: <Book size={24} className="text-gray-800" />, label: 'Learn', key: 'learnings' },
        { to: '/about', icon: <Info size={24} className="text-gray-800" />, label: 'About', key: 'about' },
    ];

    const getActiveKey = () => {
        if (location.pathname.startsWith('/home')) return 'home';
        if (location.pathname.startsWith('/masjids')) return 'masjid';
        if (location.pathname.startsWith('/favorite')) return 'favourite';
        if (location.pathname.startsWith('/learn')) return 'learnings';
        if (location.pathname.startsWith('/about')) return 'about';
        return '';
    };

    const activeKey = getActiveKey();

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-yellow-400 rounded-full px-8 py-3 flex items-center space-x-6 shadow-lg">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className="group"
                    >
                        <div
                            className={`
                                flex flex-col items-center font-bold justify-center
                                w-10 h-12
                                rounded-full
                                transition-colors
                                
                            `}
                        >
                            {item.icon}
                            <span className="text-[10px] text-gray-800 mt-1">{item.label}</span>
                            <span
                                className={`
                                    block mt-1 h-1 w-4 rounded-full transition-all duration-300
                                    ${activeKey === item.key ? 'bg-black' : 'bg-transparent'}
                                `}
                            />
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
