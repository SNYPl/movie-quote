const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 1000000,
  storage: multer.memoryStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, Date.now() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

const resizeImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  req.file.filename = `user-${req.user.username}-${Date.now()}.jpeg`;

  const filePath = req.file.buffer;

  sharp(filePath)
    .resize(500, 500)
    // .toBuffer()
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`./uploads/images/${req.file.filename}`, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
};

module.exports = {
  fileUpload,
  resizeImage,
};
