const pool = require("../config/db"); 

const createMasjidTable = `
  CREATE TABLE IF NOT EXISTS masjids (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    town VARCHAR(255),
    fajr VARCHAR(50),
    fajrIqamah VARCHAR(50),
    zuhar VARCHAR(50),
    zuharIqamah VARCHAR(50),
    asar VARCHAR(50),
    asarIqamah VARCHAR(50),
    maghrib VARCHAR(50),
    maghribIqamah VARCHAR(50),
    isha VARCHAR(50),
    ishaIqamah VARCHAR(50),
    jummah VARCHAR(50),
    jummahIqamah VARCHAR(50),
    announcements TEXT,
    adminUsername VARCHAR(255),
    adminPassword VARCHAR(255),
    adminEmail VARCHAR(255),
    adminPhone VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

// Create the table if it doesn't exist
const initializeMasjidTable = async () => {
    try {
        await pool.query(createMasjidTable);
        console.log("Masjid table is ready.");
    } catch (err) {
        console.error("Error creating 'masjids' table:", err.message);
    }
};

// Call the function to initialize the table
initializeMasjidTable();

module.exports = pool; // Export the pool for further use
