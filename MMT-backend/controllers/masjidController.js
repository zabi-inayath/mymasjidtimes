const db = require("../config/db");
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

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

const loginMasjid = async (req, res) => {
    const { adminUsername, adminPassword } = req.body;

    try {
        const sql = "SELECT * FROM masjids WHERE adminUsername = ? AND adminPassword = ?";
        const [rows] = await db.query(sql, [adminUsername, adminPassword]);

        if (rows.length > 0) {
            const masjid = rows[0];
            // Include essential data in the token
            const token = jwt.sign(
                {
                    id: masjid.id,
                    adminUsername: masjid.adminUsername,
                    masjidName: masjid.name,
                    iat: Math.floor(Date.now() / 1000) // issued at
                },
                SECRET,
                { expiresIn: '24m' } // Extended to 24 hours for better UX
            );

            res.status(200).json({
                message: "Login successful",
                masjid: {
                    id: masjid.id,
                    name: masjid.name
                },
                token
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Authentication error" });
    }
};

const verifyMasjidToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.masjid = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(403).json({ message: "Invalid token" });
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

const addNewMasjid = async (req, res) => {
    const {
        name,
        address,
        town,
        fajr,
        fajrIqamath,
        zuhar,
        zuharIqamath,
        asar,
        asarIqamath,
        maghrib,
        maghribIqamath,
        isha,
        ishaIqamath,
        jummah,
        jummahIqamath,
        announcements,
        adminUsername,
        adminPassword,
        adminEmail,
        adminPhone,
    } = req.body;

    try {
        // Fixed SQL query with correct number of placeholders
        const sql = `
            INSERT INTO masjids 
            (name, address, town, fajr, fajrIqamath, zuhar, zuharIqamath, asar, asarIqamath, maghrib, maghribIqamath, isha, ishaIqamath, jummah, jummahIqamath, announcements, adminUsername, adminPassword, adminEmail, adminPhone)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            name,
            address,
            town,
            fajr,
            fajrIqamath,
            zuhar,
            zuharIqamath,
            asar,
            asarIqamath,
            maghrib,
            maghribIqamath,
            isha,
            ishaIqamath,
            jummah,
            jummahIqamath,
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
        console.error("Error adding masjid:", error);
        res.status(500).json({ message: "Error adding masjid." });
    }
};

const getMasjidInfo = async (req, res) => {
  try {
    const masjidId = req.params.id;
    const sql = `
      SELECT
        name,
        address,
        town,
        fajr,
        fajrIqamath,
        zuhar,
        zuharIqamath,
        asar,
        asarIqamath,
        maghrib,
        maghribIqamath,
        isha,
        ishaIqamath,
        jummah,
        jummahIqamath
      FROM masjids
      WHERE id = ?
    `;

    const [result] = await db.query(sql, [masjidId]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Masjid not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching masjid info:", error);
    res.status(500).json({ message: "Error fetching masjid info" });
  }
};

const updateMasjidTimes = async (req, res) => {
    try {
        const masjidId = req.params.id;

        const {
            fajr,
            fajrIqamath,
            zuhar,
            zuharIqamath,
            asar,
            asarIqamath,
            maghrib,
            maghribIqamath,
            isha,
            ishaIqamath,
            jummah,
            jummahIqamath,
            lastUpdated
        } = req.body;

        const sql = `
            UPDATE masjids 
            SET fajr = ?, fajrIqamath = ?, zuhar = ?, zuharIqamath = ?,
                asar = ?, asarIqamath = ?, maghrib = ?, maghribIqamath = ?,
                isha = ?, ishaIqamath = ?, jummah = ?, jummahIqamath = ?,
                updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?
        `;

        const values = [
            fajr, fajrIqamath, zuhar, zuharIqamath,
            asar, asarIqamath, maghrib, maghribIqamath,
            isha, ishaIqamath, jummah, jummahIqamath,
            masjidId
        ];

        const [result] = await db.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Masjid not found" });
        }

        res.json({ message: "Prayer times updated successfully" });
    } catch (error) {
        console.error("Error updating prayer times:", error);
        res.status(500).json({ message: "Error updating prayer times" });
    }
};

const updateAnnouncement = async (req, res) => {
    try {
        const masjidId = req.params.id;
        const { announcements } = req.body;

        const sql = `UPDATE masjids SET announcements = ? WHERE id = ?`;
        const [result] = await db.query(sql, [announcements, masjidId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Masjid not found" });
        }

        res.json({ message: "Announcement updated successfully" });
    } catch (error) {
        console.error("Error updating announcement:", error);
        res.status(500).json({ message: "Error updating announcement" });
    }
};

const removeAnnouncement = async (req, res) => {
    try {
        const masjidId = req.params.id;

        const sql = `UPDATE masjids SET announcements = NULL WHERE id = ?`;
        const [result] = await db.query(sql, [masjidId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Masjid not found" });
        }

        res.json({ message: "Announcement removed successfully" });
    } catch (error) {
        console.error("Error removing announcement:", error);
        res.status(500).json({ message: "Error removing announcement" });
    }
};

module.exports = {
    getMasjids,
    addNewMasjid,
    loginMasjid,
    verifyMasjidToken,
    getMasjidInfo,
    updateMasjidInfo,
    updateMasjidTimes,
    updateAnnouncement,
    removeAnnouncement
};
