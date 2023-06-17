const jwt = require("jsonwebtoken");
const secret = "loginSecret";

const withAuth = function (req, res, next) {
  let token = String(req.get("Authorization")).split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, secret);

    return res.status(200).json({ message: "authorized" });
  } catch (err) {
    res.send(err.message);
  }
  if (!decodedToken) {
    res.status(401).send({ message: "can't authorize" });
  }

  next();
};
module.exports = withAuth;

// const express = require("express");
// const User = require("../models/User.mongoose");
//  const jwt = require("jsonwebtoken");
//  const crypto = require("crypto");

//  module.exports = (req, res, next) => {
//   let token = String(req.get("Authorization")).split(" ")[1];

//   console.log(token);

//   let decodedToken;

//   try {
//     decodedToken = jwt.verify(token, secret);

//     return res.status(200).json({ token: decodedToken });
//   } catch (err) {
//     res.send(err.message);
//   }
//   if (!decodedToken) {
//     res.send("cant authorize");
//   }

//   next();
//  };
