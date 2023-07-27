const jwt = require("jsonwebtoken");

const withAuth = function (req, res, next) {
  let token = req.cookies.token;

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET_LOGIN);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = withAuth;
