const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3001;
const cors = require("cors");
const signUpRoutes = require("./routes/signUpRoutes");

const corsOptions = {
  origin: "*",
  credentials: true,
  // optionSuccessStatus: 200,
  // exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(signUpRoutes);

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
