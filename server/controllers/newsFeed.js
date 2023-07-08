const User = require("../models/user");
const Quote = require("../models/quotes");
const Movie = require("../models/movie");

exports.newsFeedQuotes = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({ $or: [{ username }, { email: username }] });
  // const quotes = await Quote.find();

  if (!user) return res.status(401).send("something problem");
  const movies = await Movie.find().populate("quotes");

  const quotes = await Movie.find().populate({
    path: "quotes",
    select: "quotes", // Select only the 'name' field from the populated movie
  });

  console.log(quotes);

  return res.status(200).send({
    user,
  });
};

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
