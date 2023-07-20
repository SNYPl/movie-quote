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

router.get(
  "/dashboard/notifications/quotes",
  isAuth,
  newsFeedControllers.getNotifications
);

router.post(
  "/dashboard/notifications/quotes/read-all",
  isAuth,
  newsFeedControllers.readAllNotifications
);

module.exports = router;
