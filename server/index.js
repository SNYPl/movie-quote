require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3001;
const cors = require("cors");

app.use(cookieParser());

const signUpRoutes = require("./routes/signUpRoutes");
const signInRoutes = require("./routes/loginRoutes");
const forgotPassword = require("./routes/forgotPasswordRoutes");
const newsFeedRoutes = require("./routes/newsFeed");
const profileRoutes = require("./routes/profile");
const movieListRoutes = require("./routes/movieList");

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

app.use(signInRoutes);
app.use(signUpRoutes);
app.use(forgotPassword);
app.use(newsFeedRoutes);
app.use(profileRoutes);
app.use(movieListRoutes);

app.use((err, req, res, next) => {
  res.status(500).render("500", {});
});

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://snypisia:NvImgwQIMEo16cnw@moviequote.xfabptr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });
