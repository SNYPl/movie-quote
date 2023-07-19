const User = require("../models/user");
const Quote = require("../models/quotes");
const Movie = require("../models/movie");

exports.newsFeedQuotes = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({ $or: [{ username }, { email: username }] });

  if (!user) return res.status(401).send("something problem");

  try {
    const quotes = await Quote.find();

    // const likedByUser = quotes.likes.includes(user._id);

    // console.log(likedByUser);

    const quotesWithMovie = await Promise.all(
      quotes.map(async (el) => {
        const movie = await Movie.findById(el.movie);
        const quoteAuthor = await User.findById(el.quoteAuthor);
        const likedByUser = el.likes.includes(user._id);

        return {
          quote: el,
          liked: likedByUser,
          quoteAuthor: {
            authorName: quoteAuthor.username,
            image: quoteAuthor.image,
          },
          movie: {
            name: movie.name,
            year: movie.year,
          },
          user: {
            name: user.username,
            image: user.image,
          },
        };
      })
    );

    return res.status(200).send(quotesWithMovie);
  } catch (err) {
    return res.status(403).send(err.message);
  }
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

exports.dashboardMovieListNames = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({ $or: [{ username }, { email: username }] });

  if (!user) return res.status(401).send("something problem");

  const movieListNames = await Movie.find({}, "name").exec();

  return res.status(200).send(movieListNames);
};

exports.dashboardAddQuote = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({ $or: [{ username }, { email: username }] });

  if (!user) return res.status(401).send("something problem");

  const text = req.body.text;
  const textGeo = req.body.textGeo;
  const img = req.body.quoteImage;
  const movie = req.body.movie;

  const quoteMovie = await Movie.findOne({ name: movie });
  try {
    const quote = new Quote({
      quoteAuthor: user,
      text: text,
      textGeo: textGeo,
      image: img,
      likes: [],
      movie: quoteMovie,
      comments: [],
    });

    quote.save();

    if (!movie) return res.status(401).send("cant find movie id");

    const addToMovie = await Movie.findOneAndUpdate(
      { name: movie },
      { $push: { quotes: [quote] } },
      {
        new: true,
      }
    ).then();

    return res.status(200).send("quote added");
  } catch (err) {
    return res.status(403).send(err.message);
  }
};

exports.getNotifications = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({ $or: [{ username }, { email: username }] });

  if (!user) return res.status(401).send("something problem");

  try {
    const userQuotes = await Quote.find(
      { quoteAuthor: user._id },
      "notifications"
    ).exec();

    return res.status(200).send(...userQuotes);
  } catch (err) {
    return res.status(403).send(err.message);
  }
};

exports.readAllNotifications = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({ $or: [{ username }, { email: username }] });

  if (!user) return res.status(401).send("something problem");

  try {
    // const userQuotes = await Quote.find(
    //   { quoteAuthor: user._id },
    //   "notifications"
    // ).exec();

    return res.status(200).send("readed");
  } catch (err) {
    return res.status(403).send(err.message);
  }
};
