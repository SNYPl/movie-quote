const mongoose = require("mongoose");
const { Schema } = mongoose;
const Movie = require("./movie");

const quoteSchema = new Schema(
  {
    quoteAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    textGeo: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movie",
      required: true,
    },
    comments: [
      {
        commentAuthor: {},
        comment: {
          type: String,
        },
      },
    ],
    notifications: [
      {
        authorId: String,
        author: {},
        action: {
          type: String,
        },
        read: Boolean,
        time: String,
      },
    ],
    date: { type: String },
  },
  {
    collection: "quotes",
  }
);

// quoteSchema.pre("deleteOne", function (next) {
//   const query = this.getQuery();
//   const documentId = query._id;

//   Movie.deleteMany({ _id: { $in: "" } });

//   next();
// });

quoteSchema.pre("deleteOne", async function (next) {
  const query = this.getQuery();
  const documentId = query._id;

  const quoteId = documentId;

  const movies = await Movie.find({ quotes: quoteId });

  //Remove the quote reference from each movie
  await Promise.all(
    movies.map(async (movie) => {
      movie.quotes = movie.quotes.filter((quote) => !quote.equals(quoteId));
      await movie.save();
    })
  );

  next();
});

module.exports = mongoose.model("Quote", quoteSchema);
