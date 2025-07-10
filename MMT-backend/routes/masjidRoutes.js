const express = require("express");
const router = express.Router();
const {
    getMasjids,
    addNewMasjid,
    loginMasjid,
    getMasjidInfo,
    updateMasjidInfo,
    updateMasjidTimes,
    updateAnnouncement,
    removeAnnouncement,
    verifyMasjidToken,
    getEarliestTime,
} = require("../controllers/masjidController");

// Authentication routes
router.post("/login", loginMasjid);
router.post("/signup", addNewMasjid);

// Masjid management routes
router.get("/selected/:id", getMasjidInfo);
router.put("/:id", updateMasjidInfo);
router.put("/:id/times", updateMasjidTimes);

//to list earliest namaz time
router.get("/namazearliest", getEarliestTime)

// //Announcement routes
router.post("/:id/addannouncements", updateAnnouncement);
router.post("/:id/removeannouncements", removeAnnouncement);

// User routes
router.get("/allmasjids", getMasjids);

router.get('/verify-token', verifyMasjidToken, (req, res) => {
    res.json({ valid: true, masjid: req.masjid });
});

module.exports = router;
