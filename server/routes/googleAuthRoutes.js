const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    next();
  },
  passport.authenticate("google", {
    failureRedirect: "/errors",
  }),
  function (req, res) {
    const user = req.user;
    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET_LOGIN,
      {
        expiresIn: "180m",
      }
    );

    res.redirect(
      302,
      `http://localhost:3000/auth/google/success?token=${token}`
    );
  }
);

router.get("/google/success", (req, res, next) => {
  res.status(200).send("redirected");
});

// router.get("/auth/logout");

module.exports = router;
