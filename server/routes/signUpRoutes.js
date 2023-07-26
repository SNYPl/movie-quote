const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUp");
const passport = require("passport");
const isAuth = require("../middleware/isAuth");

router.post("/registration", signUpController.postSignUp);

router.put("/verify/:token", signUpController.verifyAccount);

router.post("/sendmail", isAuth, signUpController.sendVerifyMail);

module.exports = router;
