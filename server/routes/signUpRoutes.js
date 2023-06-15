const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUp");

router.post("/registration", signUpController.postSignUp);

router.put("/verify/:token", signUpController.verifyAccount);

module.exports = router;
