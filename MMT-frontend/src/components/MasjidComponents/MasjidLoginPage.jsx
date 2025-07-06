import React, { useState } from 'react';

export default function MasjidLoginPage() {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        console.log('Login attempted with:', { userID, password });
    };

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-6">
                    <div className="-mb-7">
                        <img className='h-40 w-40 mx-auto' src='/myMasjidTimes_Logo.png' />
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
                                className="w-30 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            >
                                LOGIN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}