const express = require("express");
const router = express.Router();
const {
    getMasjids,
    addMasjid,
    loginMasjid,
    getMasjidInfo,
    updateMasjidInfo,
    updateMasjidTimes,
    updateAnnouncement,
    removeAnnouncement,
} = require("../controllers/masjidController");

// Authentication routes
router.post("/login", loginMasjid);
router.post("/signup", addMasjid);

// Masjid management routes
router.get("/selected/:id", getMasjidInfo);
router.put("/:id", updateMasjidInfo);
router.put("/:id/times", updateMasjidTimes);

// //Announcement routes
router.post("/:id/addannouncements", updateAnnouncement);
router.post("/:id/removeannouncements", removeAnnouncement);

// User routes
router.get("/allmasjids", getMasjids);

module.exports = router;
