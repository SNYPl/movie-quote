const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");

exports.postSignUp = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    User.findOne({ $or: [{ username: username }, { email: email }] }).then(
      (userDoc) => {
        if (userDoc) {
          return res.status(400).send("That user already exists!");
        }

        const userToken = { username: username };

        const accessToken = jwt.sign(
          userToken,
          process.env.SECRET_VERIFY_EMAIL,
          {
            expiresIn: "1d",
          }
        );

        sgMail.setApiKey(process.env.SENDGRID_PASSWORD);

        const mailOptions = {
          to: email,
          from: `snypisia@gmail.com`,
          subject: "Verification",
          text: "Welcome to moviequote!",
          html: `<!doctype html>
            <html>
              <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              </head>
              <body style="font-family: sans-serif;">
                <div style="display: block; margin: auto; max-width: 600px;" class="main">
                  <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Welcome ${username}</h1>
                  <a href="https://chemifilmebisquotebi.web.app/verify/token=${accessToken}">Click to Verify , link will be valid for 10 minute</a>
                </div>
                <style>
                  .main { background-color: white; }
                  a:hover { border-left-width: 1em; min-height: 2em; }
                </style>
              </body>
            </html>`,
        };

        sgMail.send(mailOptions).then(
          (res) => {},
          (error) => {
            console.error(error);

            if (error.response) {
              console.error(error.response.body);
            }
          }
        );

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
    jwt.verify(token, process.env.SECRET_VERIFY_EMAIL, function (err, decoded) {
      if (err) throw new Error("token is expired, try again");
    });

    User.findOneAndUpdate(
      { token: token },
      { $set: { verified: true }, $unset: { token: "" } },
      { new: true }
    ).catch((err) => {
      if (err) throw new Error("cant verify");
    });

    res.status(200).send("account was verified");
  } catch (err) {
    return res.status(401).send({
      message: "Error while verify, try again",
    });
  }
};

exports.sendVerifyMail = async (req, res, next) => {
  const username = req.user.username;

  const SENDER_EMAIL = "snypisia@gmail.com";
  const api_name = "Verification";
  const sender = { name: api_name, email: SENDER_EMAIL };

  try {
    sgMail.setApiKey(process.env.SENDGRID_PASSWORD);

    User.findOne({ $or: [{ username: username }, { email: username }] }).then(
      (user) => {
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
          <a href="https://chemifilmebisquotebi.web.app/verify/token=${user.token}">Click to Verify email , link will be valid for 10 minute</a>
        </div>
        <style>
          .main { background-color: white; }
          a:hover { border-left-width: 1em; min-height: 2em; }
        </style>
      </body>
    </html>`,
        };

        sgMail.send(mailOptions).then(
          (res) => {},
          (error) => {
            console.error(error);

            if (error.response) {
              console.error(error.response.body);
            }
          }
        );

        res.status(200).send({ message: "mail sent" });
      }
    );
  } catch (err) {
    res.status(401).send(err.message);
  }
};
