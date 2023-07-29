const express = require("express");
const router = express.Router();
const profileControllers = require("../controllers/profile");
const isAuth = require("../middleware/isAuth");
const { fileUpload, resizeImage } = require("../middleware/file-upload");

router.patch(
  "/profile/upload-photo",
  isAuth,
  fileUpload.single("image"),
  resizeImage,
  profileControllers.updateUsername
);

module.exports = router;
