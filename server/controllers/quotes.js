const User = require("../models/user");
const Movie = require("../models/movie");
const Quote = require("../models/quotes");

exports.addMovieQuote = async (req, res, next) => {
  const username = req.user.username;
  if (!username) return res.status(401).send("invalid username or token");

  const quoteText = req.body.text;
  const quoteTextGeo = req.body.textGeo;
  const image = req.body.quoteImage;

  const movieId = req.url.split("=");
  const idSplit = movieId[1].split("/");
  const id = idSplit[0];
  const user = await User.findOne({ username: username });
  try {
    const quote = new Quote({
      quoteAuthor: user,
      text: quoteText,
      textGeo: quoteTextGeo,
      image: image,
      likes: 0,
      comments: [],
    });

    quote.save();

    if (!id) return res.status(401).send("cant find movie id");

    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $push: { quotes: [quote] } },
      {
        new: true,
      }
    );

    return res.status(200).send("quote added");
  } catch (err) {
    return res.status(403).send(err.message);
  }
};

exports.getMovieQuotes = async (req, res, next) => {
  const username = req.user.username;
  if (!username) return res.status(401).send("invalid username or token");

  const movieId = req.url.split("=");
  const idSplit = movieId[1].split("/");
  const id = idSplit[0];
  try {
    if (!id) return res.status(401).send("cant find movie id");

    const movie = await Movie.findById({ _id: id }, "quotes");

    const quotes = await Quote.find({
      _id: {
        $in: movie.quotes,
      },
    });

    return res.status(200).send({
      quotes,
    });
  } catch (err) {
    return res.status(403).send(err.message);
  }
};

exports.getQuoteById = async (req, res, next) => {
  const username = req.user.username;
  if (!username) return res.status(401).send("invalid username or token");
  const quoteId = req.params.quoteId.split("=");
  const id = quoteId[1];

  try {
    const movies = await Movie.findOne({ quotes: id });

    const quote = await Quote.findOne({ _id: id });

    const quoteAuthor = await User.findOne({ _id: quote.quoteAuthor });

    return res.status(200).send({
      quote,
      quoteAuthorData: {
        name: quoteAuthor.username,
        image: quoteAuthor.image,
      },
      movie: movies._id,
    });
  } catch (err) {
    return res.status(403).send(err.message);
  }
};

exports.editMovieQuote = async (req, res, next) => {
  const username = req.user.username;
  if (!username) return res.status(401).send("invalid username or token");
  const quoteId = req.params.quoteId.split("=");
  const id = quoteId[1];
  const text = req.body.text;
  const textGeo = req.body.textGeo;
  const image = req.body.image;

  let payload = {
    text,
    textGeo,
    image,
  };

  let updateObj = {};

  for (let [key, value] of Object.entries(payload)) {
    if (value !== "undefined") {
      updateObj[key] = value;
    }
  }

  try {
    const editQuote = Quote.findOneAndUpdate({ _id: id }, updateObj, {
      new: true,
      ignoreUndefined: true,
    }).then();

    return res.status(200).send("quote edited");
  } catch (err) {
    return res.status(403).send(err.message);
  }
};

exports.deleteMovieQuote = async (req, res, next) => {
  const username = req.user.username;
  if (!username) return res.status(401).send("invalid username or token");
  const id = req.body.id;
  try {
    const movies = await Movie.find({ quotes: id });

    const deleted = await Quote.deleteOne({ _id: id });

    return res
      .status(200)
      .send({ message: "quote deleted", movie: movies[0]._id });
  } catch (err) {
    return res.status(403).send(err.message);
  }
};
