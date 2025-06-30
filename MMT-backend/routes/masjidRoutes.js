const express = require("express");
const router = express.Router();
const {
    getMasjids,
    addMasjid,
} = require("../controllers/masjidController");

router.get("/", getMasjids);
router.post("/", addMasjid);

module.exports = router;
