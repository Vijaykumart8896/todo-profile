const express = require("express");
const { UserRegister, LogiIn } = require("../controller/userController");
const {verifyToken} =require("../middleware/verifyToken")
const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", LogiIn);

module.exports = router;
