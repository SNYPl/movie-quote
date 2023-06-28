const User = require("../models/user");
const Movie = require("../models/movie");

exports.addMovie = async (req, res, next) => {
  const username = req.user.username;
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
    res.status(403).send({ message: err.message });
  }
};
