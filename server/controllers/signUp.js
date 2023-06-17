const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

exports.postSignUp = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  const SENDER_EMAIL = "snypisia@gmail.com";
  const api_name = "stats";
  const sender = { name: api_name, email: SENDER_EMAIL };

  try {
    User.findOne({ $or: [{ username: username }, { email: email }] }).then(
      (userDoc) => {
        if (userDoc) {
          return res.status(400).send("That user already exists!");
        }

        const userToken = { username: username };

        const accessToken = jwt.sign(userToken, "verify", {
          expiresIn: "1d",
        });

        // const accessToken = jwt.sign(userToken, "verify");

        const mailOptions = {
          from: sender,
          to: email,
          subject: "Verification",
          text: "Welcome to Mailtrap Sending!",
          html: `<!doctype html>
            <html>
              <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              </head>
              <body style="font-family: sans-serif;">
                <div style="display: block; margin: auto; max-width: 600px;" class="main">
                  <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Welcome ${username}</h1>
                  <a href="http://localhost:3000/verify/token=${accessToken}">Click to Verify , link will be valid for 10 minute</a>
                </div>
                <style>
                  .main { background-color: white; }
                  a:hover { border-left-width: 1em; min-height: 2em; }
                </style>
              </body>
            </html>`,
        };

        const transport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "9110c24e7dcdf0",
            pass: "e993ad3e7a237b",
          },
        });

        transport.sendMail(mailOptions).catch((err) => console.log(err));

        const user = new User({
          username: username,
          password: hashedPassword,
          email: email,
          verified: false,
          token: accessToken,
        });
        res.status(200).send({ email: email, message: "account was created" });
        return user.save();
      }
    );
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

exports.verifyAccount = async (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  try {
    jwt.verify(token, "verify", function (err, decoded) {
      if (err) throw new Error("token is expired, try again");
    });

    User.findOneAndUpdate(
      { token: token },
      { $set: { verified: true }, $unset: { token: "" } },
      { new: true }
    ).catch((err) => console.log(err));

    res.status(200).send("account was verified");
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Error while verify, try again",
    });
  }
};

exports.sendVerifyMail = async (req, res, next) => {
  const username = req.body.user;

  const SENDER_EMAIL = "snypisia@gmail.com";
  const api_name = "stats";
  const sender = { name: api_name, email: SENDER_EMAIL };

  try {
    User.findOne({ username: username }).then((user) => {
      const mailOptions = {
        from: sender,
        to: user.email,
        subject: "Verification",
        text: "Welcome to Mailtrap Sending!",
        html: `<!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      </head>
      <body style="font-family: sans-serif;">
        <div style="display: block; margin: auto; max-width: 600px;" class="main">
          <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Welcome ${username}</h1>
          <a href="http://localhost:3000/verify/token=${user.token}">Click to Verify email , link will be valid for 10 minute</a>
        </div>
        <style>
          .main { background-color: white; }
          a:hover { border-left-width: 1em; min-height: 2em; }
        </style>
      </body>
    </html>`,
      };

      const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9110c24e7dcdf0",
          pass: "e993ad3e7a237b",
        },
      });

      transport.sendMail(mailOptions).catch((err) => console.log(err));

      res.status(200).send({ message: "mail sent" });
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
};
