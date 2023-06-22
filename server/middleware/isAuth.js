const jwt = require("jsonwebtoken");
const secret = "loginSecret";

const withAuth = function (req, res, next) {
  // let token = String(req.get("Authorization")).split(" ")[1];
  let token = req.cookies.token;
 
  // let decodedToken;
  //   decodedToken = jwt.verify(token, secret);
    // console.log(decodedToken)

    try {
      const decoded = jwt.verify(token, secret);
      next();
    } catch (err) {
      res.status(400).send("Invalid token.");
    }
};

module.exports = withAuth;
