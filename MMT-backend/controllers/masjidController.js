const db = require("../config/db");

// GET all masjids
const getMasjids = async (req, res) => {
    try {
        const sql = "SELECT id, name, address, town FROM masjids";
        const [rows] = await db.query(sql);

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: "No masjids found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching masjids." });
    }
}

// SignUp masjid
const addMasjid = async (req, res) => {
    const {
        name,
        address,
        town,
        fajr,
        dhuhr,
        asr,
        maghrib,
        isha,
        jummah,
        announcements,
        adminUsername,
        adminPassword,
        adminEmail,
        adminPhone,
    } = req.body;

    try {
        const sql = `
      INSERT INTO masjids 
      (name, address, town, fajr, dhuhr, asr, maghrib, isha, jummah, announcements, adminUsername, adminPassword, adminEmail, adminPhone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [
            name,
            address,
            town,
            fajr,
            dhuhr,
            asr,
            maghrib,
            isha,
            jummah,
            announcements,
            adminUsername,
            adminPassword,
            adminEmail,
            adminPhone,
        ];

        const [result] = await db.query(sql, values);

        res.status(201).json({
            message: "Masjid added successfully",
            masjidId: result.insertId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding masjid." });
    }
};

const loginMasjid = async (req, res) => {
    const { adminUsername, adminPassword } = req.body;

    try {
        const sql = "SELECT * FROM masjids WHERE adminUsername = ? AND adminPassword = ?";
        const [rows] = await db.query(sql, [adminUsername, adminPassword]);

        if (rows.length > 0) {
            res.status(200).json({ message: "Login successful", masjid: rows[0] });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in." });
    }
};

const getMasjidInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = "SELECT * FROM masjids WHERE id = ?";
        const [rows] = await db.query(sql, [id]);

        if (rows.length > 0) {
            // Filter out sensitive information
            const {
                adminUsername,
                adminPassword,
                adminEmail,
                adminPhone,
                ...filteredData
            } = rows[0];
            res.status(200).json(filteredData);
        } else {
            res.status(404).json({ message: "Masjid not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching masjid." });
    }
};

const updateMasjidInfo = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    // Build query dynamically
    const keys = Object.keys(updateFields);
    const values = Object.values(updateFields);

    if (keys.length === 0) {
        return res.status(400).json({ message: "No fields provided to update." });
    }

    const setClause = keys.map(field => `${field} = ?`).join(', ');

    const sql = `UPDATE masjids SET ${setClause} WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [...values, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Masjid field updated successfully" });
        } else {
            res.status(404).json({ message: "Masjid not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating masjid." });
    }
};

const updateMasjidTimes = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    // Build query dynamically
    const keys = Object.keys(updateFields);
    const values = Object.values(updateFields);

    if (keys.length === 0) {
        return res.status(400).json({ message: "No fields provided to update." });
    }

    const setClause = keys.map(field => `${field} = ?`).join(', ');

    const sql = `UPDATE masjids SET ${setClause} WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [...values, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Masjid field updated successfully" });
        } else {
            res.status(404).json({ message: "Masjid not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating masjid." });
    }
};

const updateAnnouncement = async (req, res) => {
    const { id } = req.params;
    const { announcements } = req.body;

    try {
        const sql = "UPDATE masjids SET announcements = ? WHERE id = ?";
        const [result] = await db.query(sql, [announcements, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Announcements updated successfully" });
        } else {
            res.status(404).json({ message: "Masjid not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating announcements." });
    }
};

const removeAnnouncement = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = "UPDATE masjids SET announcements = NULL WHERE id = ?";
        const [result] = await db.query(sql, [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Announcement removed successfully" });
        } else {
            res.status(404).json({ message: "Masjid not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing announcement." });
    }
};

module.exports = {
    getMasjids,
    addMasjid,
    loginMasjid,
    getMasjidInfo,
    updateMasjidInfo,
    updateMasjidTimes,
    updateAnnouncement,
    removeAnnouncement
};
