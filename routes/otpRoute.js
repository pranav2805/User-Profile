const express = require("express");

const router = express();

const otpController = require("../Controllers/otpController");

router.post("/sendOtp", otpController.sendOtp);

router.post("/validateOtp", otpController.validateOtp);

module.exports = router;
