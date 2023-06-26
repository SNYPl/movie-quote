const jwt = require("jsonwebtoken");
const secret = "loginSecret";
const User = require("../models/user");

exports.dashboardGetStats = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({ username });

  if (!user) return res.status(401).send("something problem");

  // console.log(user);

  return res.status(200).send({
    email: user.email,
    image: user.image,
    movies: user.movies,
    username: user.username,
  });
};
