import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function MasjidSignupPage() {
    const [form, setForm] = useState({
        id: '',
        name: '',
        address: '',
        town: '',
        adminUsername: '',
        adminPassword: '',
        adminEmail: '',
        adminPhone: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        // MasjidID: lowercase letters/numbers/underscores, min 3 chars
        if (!/^[a-z0-9_]{3,}$/.test(form.id)) {
            newErrors.id = 'Masjid ID must be lowercase letters/numbers/underscores, at least 3 characters.';
        }

        // Username validation
        if (!/^[a-z0-9]{3,}$/.test(form.adminUsername)) {
            newErrors.adminUsername = 'Username must be lowercase letters/numbers, at least 3 characters.';
        }

        // Password validation
        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/.test(form.adminPassword)
        ) {
            newErrors.adminPassword =
                'Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number and 1 special character.';
        }

        // Email validation
        if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.adminEmail)
        ) {
            newErrors.adminEmail = 'Enter a valid email address.';
        }

        // Phone validation
        if (!/^\d{10}$/.test(form.adminPhone)) {
            newErrors.adminPhone = 'Phone must be exactly 10 digits.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleSignup = async () => {
        if (!validate()) return;

        setLoading(true);
        setMessage('');
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/masjid/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: form.id,
                    name: form.name,
                    address: form.address,
                    town: form.town,
                    adminUsername: form.adminUsername,
                    adminPassword: form.adminPassword,
                    adminEmail: form.adminEmail,
                    adminPhone: form.adminPhone,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Signup successful!');
                setForm({
                    id: '',
                    name: '',
                    address: '',
                    town: '',
                    adminUsername: '',
                    adminPassword: '',
                    adminEmail: '',
                    adminPhone: '',
                });
            } else {
                setMessage(data.message || 'Signup failed.');
            }
        } catch (err) {
            setMessage('Network error.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <div className="-mb-7">
                        <img className='h-40 w-40 mx-auto' src='/myMasjidTimes_Logo.png' alt="Logo" />
                    </div>
                    <h1 className="text-2xl hagrid font-bold text-gray-800">
                        myMasjidTimes
                    </h1>
                </div>

                <div className="p-8">
                    <h2 className="text-xl poppins font-semibold text-gray-800 text-center mb-8">
                        Masjid SignUp
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block poppins text-sm font-medium text-gray-700 mb-2">
                                Masjid ID:
                            </label>
                            <input
                                type="text"
                                name="id"
                                value={form.id}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-yellow-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 placeholder-gray-600"
                                placeholder="e.g. mmt_masjidname"
                            />
                            {errors.id && (
                                <div className="text-red-600 text-xs mt-1">{errors.id}</div>
                            )}
                        </div>
                        <div>
                            <label className="block poppins text-sm font-medium text-gray-700 mb-2">
                                Masjid Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-yellow-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 placeholder-gray-600"
                                placeholder="Masjid Name"
                            />
                        </div>
                        <div>
                            <label className="block poppins text-sm font-medium text-gray-700 mb-2">
                                Address:
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-yellow-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 placeholder-gray-600"
                                placeholder="Address"
                            />
                        </div>
                        <div>
                            <label className="block poppins text-sm font-medium text-gray-700 mb-2">
                                City:
                            </label>
                            <input
                                type="text"
                                name="town"
                                value={form.town}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-yellow-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 placeholder-gray-600"
                                placeholder="City"
                            />
                        </div>
                        <div>
                            <label className="block poppins text-sm font-medium text-gray-700 mb-2">
                                Email:
                            </label>
                            <input
                                type="email"
                                name="adminEmail"
                                value={form.adminEmail}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-yellow-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 placeholder-gray-600"
                                placeholder="Email"
                            />
                            {errors.adminEmail && (
                                <div className="text-red-600 text-xs mt-1">{errors.adminEmail}</div>
                            )}
                        </div>
                        <div>
                            <label className="block poppins text-sm font-medium text-gray-700 mb-2">
                                Phone:
                            </label>
                            <input
                                type="text"
                                name="adminPhone"
                                value={form.adminPhone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-yellow-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 placeholder-gray-600"
                                placeholder="Phone (10 digits)"
                                maxLength={10}
                            />
                            {errors.adminPhone && (
                                <div className="text-red-600 text-xs mt-1">{errors.adminPhone}</div>
                            )}
                        </div>
                        <div>
                            <label className="block poppins text-sm font-medium text-gray-700 mb-2">
                                User ID:
                            </label>
                            <input
                                type="text"
                                name="adminUsername"
                                value={form.adminUsername}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-yellow-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 placeholder-gray-600"
                                placeholder="User ID (lowercase)"
                                maxLength={15}
                            />
                            {errors.adminUsername && (
                                <div className="text-red-600 text-xs mt-1">{errors.adminUsername}</div>
                            )}
                        </div>
                        <div>
                            <label className="block poppins text-sm font-medium text-gray-700 mb-2">
                                Password:
                            </label>
                            <input
                                type="password"
                                name="adminPassword"
                                value={form.adminPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-yellow-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 placeholder-gray-600"
                                placeholder="Password"
                            />
                            {errors.adminPassword && (
                                <div className="text-red-600 text-xs mt-1">{errors.adminPassword}</div>
                            )}
                        </div>
                        <div className="pt-8 justify-center flex">
                            <button
                                type="button"
                                onClick={handleSignup}
                                disabled={loading}
                                className="w-45 poppins bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            >
                                {loading ? 'Signing Up...' : 'SignUp'}
                            </button>
                        </div>
                        {message && (
                            <div className="text-center text-red-600 poppins mt-2">{message}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
