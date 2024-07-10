const express = require("express");
const { CreateProfile } = require("../controller/profileController");
const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

router.post("/create", verifyToken, CreateProfile);

module.exports = router;
