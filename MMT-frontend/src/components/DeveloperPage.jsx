import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function DeveloperDashboard() {
    const [code, setCode] = useState("");
    const [authorized, setAuthorized] = useState(false);
    const [masjids, setMasjids] = useState([]);
    const [editMasjid, setEditMasjid] = useState(null);

    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const fetchMasjids = async (devCode) => {
        try {
            const res = await axios.get(`${BACKEND}/api/developer/masjids`, {
                headers: {
                    "x-developer-code": devCode,
                },
            });
            setMasjids(res.data);
            toast.success("Masjids loaded.");
        } catch (e) {
            toast.error("Unauthorized or error loading masjids.");
            setAuthorized(false);
        }
    };

    const handleLogin = () => {
        setAuthorized(true);
        fetchMasjids(code);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BACKEND}/api/developer/masjids/${id}`, {
                headers: {
                    "x-developer-code": code,
                },
            });
            toast.success("Deleted!");
            fetchMasjids(code);
        } catch (e) {
            toast.error("Delete failed.");
        }
    };

    const handleEditSave = async () => {
        try {
            await axios.put(
                `${BACKEND}/api/developer/masjids/${editMasjid.id}`,
                editMasjid,
                {
                    headers: {
                        "x-developer-code": code,
                    },
                }
            );
            toast.success("Updated!");
            setEditMasjid(null);
            fetchMasjids(code);
        } catch {
            toast.error("Update failed.");
        }
    };

    if (!authorized) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-orange-50">
                <div className="bg-white shadow p-8 rounded-xl w-96">
                    <div className="flex justify-center mb-4">
                        <img
                            src="/myMasjidTimes_Logo.png"
                            alt="Logo"
                            className="w-20 h-20"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Developer Access
                    </h1>
                    <input
                        type="password"
                        placeholder="Enter security code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 rounded-full transition-colors"
                    >
                        Enter
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-orange-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <img src="/myMasjidTimes_Logo.png" className="w-14 h-14" />
                        <div>
                            <div className="text-lg font-bold text-black">myMasjidTimes</div>
                            <div className="text-sm font-semibold text-gray-800">
                                Developer Panel
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setAuthorized(false);
                            setCode("");
                        }}
                        className="flex items-center gap-2 bg-yellow-400 text-gray-800 text-sm font-semibold px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Masjid List Table */}
            <div className="max-w-6xl mx-auto px-6 py-10 bg-[#fef9ef] min-h-screen">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Masjid Directory</h1>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-yellow-300">
                                <tr>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Name</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Town</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Address</th>
                                    <th className="py-4 px-6 font-semibold text-gray-900 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {masjids.map((m) => (
                                    <tr key={m.id} className="hover:bg-[#fef9ef] transition-colors">
                                        <td className="py-4 px-6 font-medium text-gray-900">{m.name}</td>
                                        <td className="py-4 px-6 text-gray-700">{m.town}</td>
                                        <td className="py-4 px-6 text-gray-500">{m.address}</td>
                                        <td className="py-4 px-6 flex justify-end space-x-2">
                                            <button
                                                className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                                                onClick={() => setEditMasjid({ ...m })}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this masjid?')) {
                                                        handleDelete(m.id)
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {editMasjid && (
                    <div className="mt-10 bg-white rounded-xl shadow-lg p-8 animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Edit Masjid Details</h2>
                            <button
                                onClick={() => setEditMasjid(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Masjid Name</label>
                                <input
                                    value={editMasjid.name || ""}
                                    onChange={(e) => setEditMasjid((prev) => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Town</label>
                                    <input
                                        value={editMasjid.town || ""}
                                        onChange={(e) => setEditMasjid((prev) => ({ ...prev, town: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input
                                        value={editMasjid.address || ""}
                                        onChange={(e) => setEditMasjid((prev) => ({ ...prev, address: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    onClick={() => setEditMasjid(null)}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditSave}
                                    className="px-6 py-2 bg-yellow-300 hover:bg-yellow-400 text-gray-900 rounded-lg shadow-sm transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
