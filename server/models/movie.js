const mongoose = require("mongoose");
const { Schema } = mongoose;

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
        default: [],
      },
    ],
  },
  {
    collection: "movies",
  }
);

module.exports = mongoose.model("movie", movieSchema);
