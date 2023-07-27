const User = require("../models/user");
const Quote = require("../models/quotes");
const Movie = require("../models/movie");
const io = require("../socket");

exports.newsFeedQuotes = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (!user) return res.status(401).send("something problem");

  try {
    const limit = req.query.limit;

    const totalQuotes = await Quote.countDocuments();

    const quotes = await Quote.find().sort({ date: -1 }).limit(limit);

    const quotesWithMovie = await Promise.all(
      quotes.map(async (el) => {
        const movie = await Movie.findById(el.movie);
        const quoteAuthor = await User.findById(el.quoteAuthor);
        const likedByUser = el.likes.includes(user._id);

        return {
          quote: el,
          liked: likedByUser,
          quoteAuthor: {
            authorName: quoteAuthor?.username,
            image: quoteAuthor?.image,
          },
          movie: {
            name: movie?.name,
            nameGeo: movie?.nameGeo,
            year: movie?.year,
          },
          user: {
            name: user?.username,
            image: user?.image,
          },
        };
      })
    );

    return res.status(200).send({
      totalQuotes: totalQuotes,
      quotes: quotesWithMovie,
    });
  } catch (err) {
    return res.status(403).send(err.message);
  }
};

exports.dashboardGetStats = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });

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

  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (!user) return res.status(401).send("something problem");

  const movieListNames = await Movie.find({}, "name").exec();

  return res.status(200).send(movieListNames);
};

exports.dashboardAddQuote = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });

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
      date: Date.now(),
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
    io.getIo().emit("quote", { action: "createQuote" });
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

    return res.status(200).send(userQuotes);
  } catch (err) {
    return res.status(403).send(err.message);
  }
};

exports.readAllNotifications = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({ $or: [{ username }, { email: username }] });

  if (!user) return res.status(401).send("something problem");

  try {
    const notificationsFilter = { "notifications.read": false };

    // Mark all notifications as read
    const updateQuery = {
      $set: { "notifications.$[elem].read": true },
    };

    const updateOptions = {
      arrayFilters: [{ "elem.read": false }],
    };

    const updateResult = await Quote.updateMany(
      notificationsFilter,
      updateQuery,
      updateOptions
    );

    if (updateResult.nModified === 0) {
      return res.status(200).send("No unread notifications found.");
    }

    return res.status(200).send("All notifications marked as read.");
  } catch (err) {
    return res.status(403).send(err.message);
  }
};
