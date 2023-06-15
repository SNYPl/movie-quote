const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUp");

router.post("/registration", signUpController.postSignUp);

module.exports = router;
