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

const signUpRoutes = require("./routes/signUpRoutes");
const signInRoutes = require("./routes/loginRoutes");
const forgotPassword = require("./routes/forgotPasswordRoutes");
const newsFeedRoutes = require("./routes/newsFeed");
const profileRoutes = require("./routes/profile");
const movieListRoutes = require("./routes/movieList");
const quotesRoutes = require("./routes/quotes");
const googleAuths = require("./routes/googleAuthRoutes");

const corsOptions = {
  origin: ["https://chemifilmebisquotebi.web.app"],
  credentials: true,
  "Access-Control-Allow-Credentials": true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials, true");
  res.setHeader(
    "Access-Control-Allow-Origin: https://chemifilmebisquotebi.web.app"
  );
  res.setHeader("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

  res.setHeader("Access-Control-Allow-Headers: Content-Type, *");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use(
  session({
    secret: "testingChrome", // Replace with a strong, random secret key
    resave: false,
    saveUninitialized: false,
  })
);

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
    const server = app.listen(process.env.PORT || port);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      // console.log(socket);
    });
  })
  .catch((error) => {
    console.log(error);
  });
