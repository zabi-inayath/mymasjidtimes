const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Get total views
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT total_views FROM site_views WHERE id = 1');
        res.json({ total_views: rows[0]?.total_views || 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching views' });
    }
});

// Increment total views
router.post('/increment', async (req, res) => {
    try {
        await db.query('UPDATE site_views SET total_views = total_views + 1 WHERE id = 1');
        const [rows] = await db.query('SELECT total_views FROM site_views WHERE id = 1');
        res.json({ total_views: rows[0]?.total_views || 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error incrementing views' });
    }
});

module.exports = router;
