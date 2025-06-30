const db = require("../config/db");

// GET all masjids
const getMasjids = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM masjids");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching masjids." });
    }
};

// ADD a new masjid
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
        announcements,
        adminUsername,
        adminPassword,
        adminEmail,
        adminPhone,
    } = req.body;

    try {
        const sql = `
      INSERT INTO masjids 
      (name, address, town, fajr, dhuhr, asr, maghrib, isha, announcements, adminUsername, adminPassword, adminEmail, adminPhone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

module.exports = {
    getMasjids,
    addMasjid,
};
