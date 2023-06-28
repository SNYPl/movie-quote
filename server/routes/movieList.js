const express = require("express");
const router = express.Router();
const movieListControllers = require("../controllers/movieList");
const isAuth = require("../middleware/isAuth");
const fileUpload = require("../middleware/file-upload");

router.patch(
  "/movie-list/add-movie",
  isAuth,
  fileUpload.single("image"),
  movieListControllers.addMovie
);

module.exports = router;
