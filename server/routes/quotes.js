const express = require("express");
const router = express.Router();
const quotesControllers = require("../controllers/quotes");
const isAuth = require("../middleware/isAuth");
const { fileUpload, resizeImage } = require("../middleware/file-upload");

router.patch(
  "/movie-list/movie/:movie/add-quote",
  isAuth,
  fileUpload.single("image"),
  resizeImage,
  quotesControllers.addMovieQuote
);

router.get(
  "/movie-list/quote/:quoteId/get-quote",
  isAuth,
  quotesControllers.getQuoteById
);

router.patch(
  "/movie-list/quote/:quoteId/edit-quote",
  isAuth,
  fileUpload.single("image"),
  resizeImage,
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

router.post(
  "/movie-list/quote/:quoteId/like",
  isAuth,
  quotesControllers.quoteLike
);

router.post(
  "/movie-list/quote/:quoteId/add-comment",
  isAuth,
  quotesControllers.addComment
);

module.exports = router;
