const express = require("express");
const router = express.Router();
const quotesControllers = require("../controllers/quotes");
const isAuth = require("../middleware/isAuth");
const fileUpload = require("../middleware/file-upload");

router.patch(
  "/movie-list/movie/:movie/add-quote",
  fileUpload.single("image"),
  isAuth,
  quotesControllers.addMovieQuote
);

router.get(
  "/movie-list/quote/:quoteId/get-quote",
  fileUpload.single("image"),
  isAuth,
  quotesControllers.getQuoteById
);

router.patch(
  "/movie-list/quote/:quoteId/edit-quote",
  fileUpload.single("image"),
  isAuth,
  quotesControllers.editMovieQuote
);

router.get(
  "/movie-list/movie/:movie/get-quotes",
  isAuth,
  quotesControllers.getMovieQuotes
);

router.delete(
  "/movie-list/movie/delete-quote",
  isAuth,
  quotesControllers.deleteMovieQuote
);

module.exports = router;
