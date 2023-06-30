const User = require("../models/user");
const Movie = require("../models/movie");

exports.addMovie = async (req, res, next) => {
  const username = req.user.username;

  if (!username) return res.status(401).send("invalid username or token");
  const genres = req.body.genre.split(",");

  try {
    const userExist = await Movie.find({
      $or: [{ name: req.body.name }, { nameGeo: req.body.nameGeo }],
    });
    if (userExist.length > 0)
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

    movie.save();

    const user = await User.findOneAndUpdate(
      { username: username },
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

  const user = await User.findOne({ username: username }, "movies _id");
  const records = await Movie.find().where("_id").in(user.movies).exec();

  return res.status(200).send({ movies: records });
};

exports.getMovie = async (req, res, next) => {
  const username = req.user.username;
  console.log(req);
  console.log("aqaa");

  // const user = await User.findOne({ username: username }, "movies _id");
  // const records = await Movie.find().where("_id").in(user.movies).exec();

  // return res.status(200).send({ movies: records });
};
