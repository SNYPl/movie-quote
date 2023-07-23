require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3001;
const cors = require("cors");
const { Strategy } = require("passport-google-oauth20");
const passport = require("passport");
const User = require("./models/user");

app.use(cookieParser());

const signUpRoutes = require("./routes/signUpRoutes");
const signInRoutes = require("./routes/loginRoutes");
const forgotPassword = require("./routes/forgotPasswordRoutes");
const newsFeedRoutes = require("./routes/newsFeed");
const profileRoutes = require("./routes/profile");
const movieListRoutes = require("./routes/movieList");
const quotesRoutes = require("./routes/quotes");

const corsOptions = {
  origin: "*",
  credentials: true,
  origin: "http://localhost:3000",
  // optionSuccessStatus: 200,
  // exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.use(signInRoutes);
app.use(signUpRoutes);
app.use(forgotPassword);
app.use(newsFeedRoutes);
app.use(profileRoutes);
app.use(movieListRoutes);
app.use(quotesRoutes);

app.use((err, req, res, next) => {
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
      // console.log("client connected");
    });
  })
  .catch((error) => {
    console.log(error);
  });
