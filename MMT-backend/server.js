const express = require("express");
const dotenv = require("dotenv");
const masjidRoutes = require("./routes/masjidRoutes");
const connectDB = require("./config/db");
// Import the database connection
const pool = require("./models/masjid");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/masjids", masjidRoutes);

app.get("/", (req, res) => {
    res.send("MMT's API is running!");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
