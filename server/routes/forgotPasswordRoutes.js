const express = require("express");
const router = express.Router();
const forgotControllers = require("../controllers/forgotPassword");

router.post("/forgot/password", forgotControllers.sendForgotMail);

router.post("/forgot/password/:token", forgotControllers.forgotVerifyEmail);

router.post("/forgot/password/:token/change", forgotControllers.changePassword);

router.post(
  "/forget/password/:token/change/repeat",
  forgotControllers.sendVerifyRepeat
);

module.exports = router;
