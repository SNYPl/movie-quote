const express = require("express");
const router = express.Router();
const newsFeedControllers = require("../controllers/newsFeed");
const isAuth = require("../middleware/isAuth");
const fileUpload = require("../middleware/file-upload");

router.get("/dashboard", isAuth, newsFeedControllers.dashboardGetStats);

router.get("/newsFeed", isAuth, newsFeedControllers.newsFeedQuotes);

router.get(
  "/dashboard/movieListNames",
  isAuth,
  newsFeedControllers.dashboardMovieListNames
);

router.patch(
  "/dashboard/newsFeed/add-quote",
  fileUpload.single("image"),
  isAuth,
  newsFeedControllers.dashboardAddQuote
);

module.exports = router;
