const jwt = require("jsonwebtoken");

const withAuth = function (req, res, next) {
  let token = req.cookies.token;
  // const token = req.headers["authorization"].split(" ")[1];

  if (!token) throw new Error("token is not defined from cookies");
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET_LOGIN);
    req.user = decodedToken;

    next();
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

module.exports = withAuth;
