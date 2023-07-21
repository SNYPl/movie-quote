const User = require("../models/user");
const Movie = require("../models/movie");
const Quote = require("../models/quotes");
const io = require("../socket");

exports.addMovieQuote = async (req, res, next) => {
  const username = req.user.username;
  if (!username) return res.status(401).send("invalid username or token");

  const quoteText = req.body.text;
  const quoteTextGeo = req.body.textGeo;
  const image = req.body.quoteImage;
  const movieName = req.body.movie;

  const movieId = req.url.split("=");
  const idSplit = movieId[1].split("/");
  const id = idSplit[0];
  const addedMovie = await Movie.findOne({
    $or: [{ _id: id }, { name: movieName }],
  });
  const user = await User.findOne({ username: username });
  try {
    const quote = new Quote({
      quoteAuthor: user,
      text: quoteText,
      textGeo: quoteTextGeo,
      image: image,
      likes: [],
      movie: addedMovie,
      comments: [],
      notifications: [],
      date: Date.now(),
    });

    quote.save();

    if (!id) return res.status(401).send("cant find movie id");

    const movie = await Movie.findOneAndUpdate(
      { _id: id },
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
    const userId = await User.findOne(
      {
        $or: [{ username }, { email: username }],
      },
      "_id"
    ).exec();

    const movies = await Movie.findOne({ quotes: id });

    const quote = await Quote.findOne({ _id: id });

    const quoteAuthor = await User.findOne({ _id: quote.quoteAuthor });
    const likedByUser = quote.likes.includes(userId._id);

    return res.status(200).send({
      quote,
      likedQuote: likedByUser,
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

    io.getIo().emit("quote", { action: "editQuote" });
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

    io.getIo().emit("quote", { action: "deleteQuote" });

    return res
      .status(200)
      .send({ message: "quote deleted", movie: movies[0]._id });
  } catch (err) {
    return res.status(403).send(err.message);
  }
};

exports.quoteLike = async (req, res, next) => {
  const username = req.user.username;
  const quoteId = req.params.quoteId.split("=");
  const id = quoteId[1];
  if (!username) return res.status(401).send("invalid token");

  try {
    const userId = await User.findOne(
      {
        $or: [{ username }, { email: username }],
      },
      "_id username image"
    ).exec();

    const quote = await Quote.findById(id);
    const likedByUser = quote.likes.includes(userId._id);

    let update = {};

    if (likedByUser) {
      update = {
        $pullAll: { likes: [userId._id] },
        $pull: { notifications: { authorId: userId.id } },
      };
    } else {
      update = {
        $addToSet: {
          likes: userId._id,
          notifications: [
            {
              authorId: userId.id,
              author: {
                name: userId.username,
                image: userId.image,
              },
              action: "like",
              read: false,
              time: new Date(),
            },
          ],
        },
      };
    }
    await Quote.updateOne({ _id: id }, update).then();

    io.getIo().emit("quote", { action: "likeQuote" });

    return res.status(200).send("Action success");
  } catch (err) {
    return res.status(403).send(err.message);
  }
};

exports.addComment = async (req, res, next) => {
  const username = req.user.username;

  const id = req.body.id;
  const comment = req.body.comment;

  if (!username) return res.status(401).send("invalid token");

  try {
    const user = await User.findOne(
      {
        $or: [{ username }, { email: username }],
      },
      "username image"
    ).exec();

    const quote = await Quote.findById(id);

    quote.comments.push({
      commentAuthor: { username: user.username, image: user.image },
      comment: comment,
    });

    quote.notifications.push({
      author: {
        name: user.username,
        image: user.image,
      },
      action: "comment",
      read: false,
      time: new Date(),
    });

    quote.save();

    io.getIo().emit("quote", { action: "commentQuote" });

    return res.status(200).send("comment added");
  } catch (err) {
    return res.status(403).send(err.message);
  }
};
