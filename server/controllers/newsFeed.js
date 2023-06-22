const jwt = require("jsonwebtoken");
const secret = "loginSecret";
const User = require("../models/user");




exports.dashboardGetStats = (req,res,next) => {
    // let user = req.cookies.user;
  let token = req.cookies.token;
  const decoded = jwt.verify(token, secret);
  const username = decoded.username;
  console.log(decoded)

res.status(200).send("aris")

}