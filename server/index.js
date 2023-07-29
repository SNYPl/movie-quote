require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3001;
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const googleSetup = require("./googlePassport");
const path = require("path");
const fs = require("fs");

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => console.log(err));
  }
});

const signUpRoutes = require("./routes/signUpRoutes");
const signInRoutes = require("./routes/loginRoutes");
const forgotPassword = require("./routes/forgotPasswordRoutes");
const newsFeedRoutes = require("./routes/newsFeed");
const profileRoutes = require("./routes/profile");
const movieListRoutes = require("./routes/movieList");
const quotesRoutes = require("./routes/quotes");
const googleAuths = require("./routes/googleAuthRoutes");

const corsOptions = {
  // origin: "*",
  credentials: true,
  origin: "http://localhost:3000",
  // optionSuccessStatus: 200,
  // exposedHeaders: ["set-cookie"],
};

app.use(
  session({
    secret: "testingChrome", // Replace with a strong, random secret key
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", googleAuths);
app.use(signInRoutes);
app.use(signUpRoutes);
app.use(forgotPassword);
app.use(newsFeedRoutes);
app.use(profileRoutes);
app.use(movieListRoutes);
app.use(quotesRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).render("500", {});
});

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://snypisia:NvImgwQIMEo16cnw@moviequote.xfabptr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    const server = app.listen(port);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      // console.log(socket);
    });
  })
  .catch((error) => {
    console.log(error);
  });
