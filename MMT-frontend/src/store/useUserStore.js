import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";

export const useUserStore = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/api/masjid');
                setData(response.data);
            } catch (err) {
                console.error("Axios request failed:", error);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}