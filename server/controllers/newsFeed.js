const User = require("../models/user");

exports.dashboardGetStats = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({ $or: [{ username }, { email: username }] });

  if (!user) return res.status(401).send("something problem");

  return res.status(200).send({
    email: user.email,
    image: user.image,
    movies: user.movies,
    username: user.username,
  });
};
