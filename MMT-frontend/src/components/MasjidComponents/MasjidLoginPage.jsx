import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function MasjidLoginPage() {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            username: '',
            password: ''
        };

        // Username validation (exactly 8 characters)
        if (userID.length > 15) {
            newErrors.username = 'Username must be exactly 15 characters';
            valid = false;
        }

        // Password validation (6+ chars, alphanumeric + special character)
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
        if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must be at least 8 characters with letters, numbers and special chars';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the form errors');
            return;
        }

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
                localStorage.setItem('masjidToken', data.token);
                localStorage.setItem('masjidID', data.masjid.id);
                navigate('/masjid/dashboard');
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
                <form onSubmit={handleLogin} className="p-8">
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
                                onChange={(e) => {
                                    setUserID(e.target.value);
                                    setErrors({ ...errors, username: '' });
                                }}
                                className={`w-full px-4 py-3 bg-yellow-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 placeholder-gray-600 ${errors.username ? 'border-red-500 border-2' : ''
                                    }`}
                                placeholder="Enter User ID"
                                maxLength={15}
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                            )}
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
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors({ ...errors, password: '' });
                                }}
                                className={`w-full px-4 py-3 bg-yellow-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 placeholder-gray-600 ${errors.password ? 'border-red-500 border-2' : ''
                                    }`}
                                placeholder="Enter Password"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Forgot Password Link */}
                        {/* <div className="text-right">
                            <button
                                type="button"
                                onClick={() => console.log('Forgot password clicked')}
                                className="text-sm text-gray-600 hover:text-gray-800 transition-colors bg-transparent border-0 p-0 cursor-pointer"
                            >
                                Forgot Password?
                            </button>
                        </div> */}

                        {/* Login Button */}
                        <div className="pt-14 justify-center flex">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-45 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {loading ? 'Logging in...' : 'LOGIN'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}