const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
    },
    verified: {
      type: Boolean,
      required: true,
    },
    token: {
      type: String,
    },
    image: {
      type: String,
      default: "",
    },
    movies: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "movie",
          default: [{}],
        },
      },
    ],
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("users", userSchema);
