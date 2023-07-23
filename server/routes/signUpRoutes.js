const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUp");
const passport = require("passport");

router.post("/registration", signUpController.postSignUp);

router.put("/verify/:token", signUpController.verifyAccount);

router.post("/sendmail", signUpController.sendVerifyMail);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    failureRedirect: "/error",
    successRedirect: "/",
  }),
  (req, res) => {
    res.status(200).send("succesfully logined");
    console.log(req);
  }
);
// router.get("/auth/logout");

module.exports = router;
