const express = require("express");
const router = express.Router();
const movieListControllers = require("../controllers/movieList");
const isAuth = require("../middleware/isAuth");

router.post("/movie-list/add-movie", isAuth, movieListControllers.addMovie);

module.exports = router;
