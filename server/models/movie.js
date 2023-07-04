const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    nameGeo: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
    year: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    descriptionGeo: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    directorGeo: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    quotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote",
        default: [{}],
      },
    ],
  },
  {
    collection: "movies",
  }
);

movieSchema.pre("deleteOne", async function (next) {
  const query = this.getQuery();
  const documentId = query._id;

  const movieId = documentId;

  const user = await User.find({ movies: movieId });

  //Remove the quote reference from each movie
  await Promise.all(
    user.map(async (user) => {
      user.movies = user.movies.filter((movie) => !movie.equals(movieId));
      await user.save();
    })
  );

  next();
});

module.exports = mongoose.model("movie", movieSchema);
