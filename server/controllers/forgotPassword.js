const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");

exports.sendForgotMail = async (req, res, next) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });

    if (!user) throw new Error("user not registered");

    const userName = { username: user.username };
    const accessToken = jwt.sign(userName, process.env.SECRET_FORGOT_PASSWORD, {
      expiresIn: 60 * 60,
    });

    sgMail.setApiKey(process.env.SENDGRID_PASSWORD);

    const SENDER_EMAIL = "snypisia@gmail.com";
    const api_name = "Forgot Password";
    const sender = { name: api_name, email: SENDER_EMAIL };

    const mailOptions = {
      from: sender,
      to: email,
      subject: "forgot Password",
      text: "Welcome to Mailtrap Sending!",
      html: `<!doctype html>
          <html>
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            </head>
            <body style="font-family: sans-serif;">
              <div style="display: block; margin: auto; max-width: 600px;" class="main">
                <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Hello ${user.email}</h1>
                <a href="https://chemifilmebisquotebi.web.app/forgot/password/token=${accessToken}=&email=${user.email}">Click here to reset password</a>
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

    res.status(200).send({ message: "email sent", email: user.email });
  } catch (err) {
    res.status(403).send({ message: err.message });
  }
};

exports.forgotVerifyEmail = (req, res, next) => {
  const token = req.body.token;

  try {
    jwt.verify(token, process.env.SECRET_FORGOT_PASSWORD, function (
      err,
      decoded
    ) {
      if (err) throw new Error("Invalid token");
    });

    res.status(200).send({ message: "account verified" });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: err.message });
  }
};

exports.changePassword = async (req, res, next) => {
  const token = req.body.token;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    jwt.verify(token, process.env.SECRET_FORGOT_PASSWORD, function (
      err,
      decoded
    ) {
      if (err) throw new Error("Invalid token , try again");
    });
    User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } }
    ).catch((err) => {
      if (!err) {
        res.send("Password successfully Updated");
      } else {
        res.send(err);
      }
    });

    res.status(200).send({ message: "password changed" });
  } catch (err) {
    res.status(401).send(err.message);
  }
};

exports.sendVerifyRepeat = async (req, res, next) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });

    if (!user) throw new Error("user not registered");

    const userName = { username: user.username };
    const accessToken = jwt.sign(userName, process.env.SECRET_FORGOT_PASSWORD, {
      expiresIn: 60 * 60,
    });

    sgMail.setApiKey(process.env.SENDGRID_PASSWORD);

    const SENDER_EMAIL = "snypisia@gmail.com";
    const api_name = "Forgot Password";
    const sender = { name: api_name, email: SENDER_EMAIL };

    const mailOptions = {
      from: sender,
      to: email,
      subject: "forgot Password",
      text: "Welcome to Mailtrap Sending!",
      html: `<!doctype html>
            <html>
              <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              </head>
              <body style="font-family: sans-serif;">
                <div style="display: block; margin: auto; max-width: 600px;" class="main">
                  <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Hello ${user.email}</h1>
                  <a href="https://chemifilmebisquotebi.web.app/forgot/password/token=${accessToken}=&email=${user.email}">Click here to reset password</a>
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
    res.status(200).send({ message: "email sent", email: user.email });
  } catch (err) {
    res.status(401).send(err.message);
  }
};
