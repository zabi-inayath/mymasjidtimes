import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function MasjidLoginPage() {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/masjid/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adminUsername: userID,
                    adminPassword: password,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Login successful!');
                navigate('/masjid/dashboard'); 
                //store token here
                localStorage.setItem('masjidToken', data.token); // Assuming the token is returned in the response
            } else {
                toast.error(data.message || 'Login failed.');
            }
        } catch (err) {
            toast.error('An error occurred while logging in.');
            console.error('Login error:', err);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-6">
                    <div className="-mb-7">
                        <img className='h-40 w-40 mx-auto' src='/myMasjidTimes_Logo.png' alt="Logo" />
                    </div>
                    <h1 className="text-2xl hagrid font-bold text-gray-800">
                        myMasjidTimes
                    </h1>
                </div>

                {/* Login Form */}
                <div className="p-8">
                    <h2 className="text-xl poppins font-semibold text-gray-800 text-center mb-8">
                        Masjid Login
                    </h2>

                    <div className="space-y-6">
                        {/* User ID Field */}
                        <div>
                            <label htmlFor="userID" className="block poppins text-sm font-medium text-gray-700 mb-2">
                                User ID:
                            </label>
                            <input
                                type="text"
                                id="userID"
                                value={userID}
                                onChange={(e) => setUserID(e.target.value)}
                                className="w-full px-4 py-3 bg-yellow-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 placeholder-gray-600"
                                placeholder=""
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block poppins text-sm font-medium text-gray-700 mb-2">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-yellow-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 placeholder-gray-600"
                                placeholder=""
                            />
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={() => console.log('Forgot password clicked')}
                                className="text-sm text-gray-600 hover:text-gray-800 transition-colors bg-transparent border-0 p-0 cursor-pointer"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <div className="pt-4 justify-center flex">
                            <button
                                type="button"
                                onClick={handleLogin}
                                disabled={loading}
                                className="w-30 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            >
                                {loading ? 'Logging in...' : 'LOGIN'}
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}