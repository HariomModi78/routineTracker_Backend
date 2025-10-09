const express = require("express");
const {sayName, verifyUser} = require("../controllers/authController");
const {verifyToken} = require("../middlewares/firebaseVerifyToken");
const router = express.Router();

router.get("/",verifyToken,verifyUser)

module.exports = router;