const express = require("express");
const router = express.Router();
const newsFeedControllers = require("../controllers/newsFeed");
const isAuth = require("../middleware/isAuth");

router.get("/dashboard", isAuth, newsFeedControllers.dashboardGetStats);

router.get("/newsFeed", isAuth, newsFeedControllers.newsFeedQuotes);

module.exports = router;
