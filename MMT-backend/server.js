const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const masjidRoutes = require("./routes/masjidRoutes");
const developerRoutes = require("./routes/developerRoutes");
const viewsRoutes = require('./routes/viewsRoutes.js');
const connectDB = require("./config/db");
const pool = require("./models/masjid");

dotenv.config();

const app = express();

app.use(cors()); // ← This allows all origins by default
app.use(express.json());

app.use("/api/masjid", masjidRoutes);
app.use("/api/developer", developerRoutes);
app.use("/api/views", viewsRoutes)

app.get("/", (req, res) => {
    res.send("MMT's API is running!");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});