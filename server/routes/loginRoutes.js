const express = require("express");
const router = express.Router();
const signInControllers = require("../controllers/login");

router.post("/login", signInControllers.signIn);

module.exports = router;
