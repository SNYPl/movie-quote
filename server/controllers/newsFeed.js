const User = require("../models/user");
const Quote = require("../models/quotes");
const Movie = require("../models/movie");

exports.newsFeedQuotes = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne({ $or: [{ username }, { email: username }] });

  if (!user) return res.status(401).send("something problem");

  try {
    const quotes = await Quote.find();

    const quotesWithMovie = await Promise.all(
      quotes.map(async (el) => {
        const movie = await Movie.findById(el.movie);
        const quoteAuthor = await User.findById(el.quoteAuthor);

        return {
          quote: el,
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

// exports.quoteLike = async (req, res, next) => {
//   const username = req.user.username;

//   const user = await User.findOne({ $or: [{ username }, { email: username }] });

//   if (!user) return res.status(401).send("something problem");

//   return res.status(200).send("test");
// };
