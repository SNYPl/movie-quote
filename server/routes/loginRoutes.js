const express = require("express");
const router = express.Router();
const signInControllers = require("../controllers/login");
const isAuth = require("../middleware/isAuth");

router.post("/login", signInControllers.signIn);
// router.post("/logins", isAuth, signInControllers.signIns);

module.exports = router;
