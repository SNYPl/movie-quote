const User = require("../models/user");
const Movie = require("../models/movie");

exports.addMovie = async (req, res, next) => {
  const username = req.user.username;

  if (!username) return res.status(401).send("invalid username or token");
  const genres = req.body.genre.split(",");

  try {
    const movieExist = await Movie.find({
      $or: [{ name: req.body.name }, { nameGeo: req.body.nameGeo }],
    });
    if (movieExist.length > 0)
      return res
        .status(400)
        .send({ message: "movie on that name, already added" });

    const movie = new Movie({
      name: req.body.name,
      nameGeo: req.body.nameGeo,
      genre: genres,
      year: req.body.year,
      director: req.body.director,
      directorGeo: req.body.directorGeo,
      description: req.body.description,
      descriptionGeo: req.body.descriptionGeo,
      budget: req.body.budget,
      image: req.body.image,
    });

    await movie.save();

    const user = await User.findOneAndUpdate(
      {
        $or: [{ username: username }, { email: username }],
      },
      { $push: { movies: [movie] } },
      {
        new: true,
      }
    );

    if (!user) return res.status(401).send("can't find username");

    res.status(200).send({ message: "movie added" });
  } catch (err) {
    res.status(403).send(err.message);
  }
};

exports.getAllMovie = async (req, res, next) => {
  const username = req.user.username;

  const user = await User.findOne(
    {
      $or: [{ username: username }, { email: username }],
    },
    "movies _id"
  );
  let records = [];
  if (user) {
    records = await Movie.find().where("_id").in(user?.movies).exec();
  }

  return res.status(200).send({ movies: records });
};

exports.editMovie = async (req, res, next) => {
  const username = req.user.username;
  const movieId = req.body.id;

  if (!username) return res.status(401).send("invalid username or token");

  const genres = req.body.genre.split(",");

  try {
    await Movie.findByIdAndUpdate(movieId, {
      name: req.body.updatedName,
      nameGeo: req.body.nameGeo,
      genre: genres,
      year: req.body.year,
      director: req.body.director,
      directorGeo: req.body.directorGeo,
      description: req.body.description,
      descriptionGeo: req.body.descriptionGeo,
      budget: req.body.budget,
      image: req.body.image,
    }).then();

    res.status(200).send({ message: "movie edited" });
  } catch (err) {
    res.status(403).send(err.message);
  }
};

exports.deleteMovie = async (req, res, next) => {
  const username = req.user.username;
  const movieId = req.body.id;

  if (!username) return res.status(401).send("invalid username or token");

  try {
    const deleteMovie = await Movie.deleteOne({ _id: movieId }).then();

    res.status(200).send({ message: "movie deleted" });
  } catch (err) {
    res.status(403).send(err.message);
  }
};

exports.getMovie = async (req, res, next) => {
  const username = req.user.username;
  if (!username) return res.status(401).send("invalid username or token");

  const movieId = req.url.split("=");
  const id = movieId[1];
  try {
    const records = await Movie.findById(id);

    return res.status(200).send({ movie: records });
  } catch (err) {
    return res.status(403).send({ message: err.message });
  }
};
