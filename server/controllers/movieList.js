const User = require("../models/user");
const Movie = require("../models/movie");

exports.addMovie = (req, res, next) => {
  const username = req.user.username;

  try {
    Movie.create({
      name: req.body.name,
      nameGeo: req.body.nameGeo,
      genre: [...req.body.genre],
      year: req.body.year,
      director: req.body.director,
      directorGeo: req.body.directorGeo,
      description: req.body.description,
      descriptionGeo: req.body.descriptionGeo,
      budget: req.body.budget,
    });

    // User.findOne({ username: username }).populate("movie").exec();
    console.log(req.body);

    res.status(200).send({ message: "movie added" });
  } catch (err) {
    res.status(403).send({ message: err.message });
  }
};
