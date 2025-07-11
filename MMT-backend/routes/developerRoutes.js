const express = require("express");
const router = express.Router();
const db = require("../config/db");
const checkDeveloperCode = require("../middleware/checkDeveloperCode");

// GET all masjids with full info
router.get("/masjids", checkDeveloperCode, async (req, res) => {
    try {
        const sql = "SELECT * FROM masjids";
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching masjids." });
    }
});

// UPDATE masjid info
router.put("/masjids/:id", checkDeveloperCode, async (req, res) => {
    function formatDateToMySQL(date) {
        if (!date) return null;
        const d = new Date(date);
        return d.toISOString().slice(0, 19).replace("T", " ");
    }
      
    try {
        const { id } = req.params;
        const updateFields = req.body;

        // ✅ patch dates
        if (updateFields.createdAt) {
            updateFields.createdAt = formatDateToMySQL(updateFields.createdAt);
        }
        if (updateFields.updatedAt) {
            updateFields.updatedAt = formatDateToMySQL(updateFields.updatedAt);
        }

        if (!Object.keys(updateFields).length) {
            return res.status(400).json({ message: "No fields to update." });
        }

        const keys = Object.keys(updateFields);
        const values = Object.values(updateFields);
        const setClause = keys.map(field => `${field} = ?`).join(", ");

        const sql = `UPDATE masjids SET ${setClause} WHERE id = ?`;
        const [result] = await db.query(sql, [...values, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Masjid not found." });
        }

        res.json({ message: "Masjid updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating masjid." });
    }
});


// DELETE masjid
router.delete("/masjids/:id", checkDeveloperCode, async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM masjids WHERE id = ?";
        const [result] = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Masjid not found." });
        }

        res.json({ message: "Masjid deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting masjid." });
    }
});

module.exports = router;
