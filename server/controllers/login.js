const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signIn = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  // const email = req.body.email;
  // const googleId = req.body.googleId;

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isSame = await bcrypt.compare(password, user.password);

    if (!isSame) {
      throw new Error("incorrect password");
    }

    const userToken = { username: username };
    const accessToken = jwt.sign(userToken, "loginSecret", {
      expiresIn: "180m",
    });

    // const expiration = new Date();

    // expiration.setHours(expiration.getHours() + 3);

    // res.cookie('jwt',accessToken, { maxAge: expiration, httpOnly: true });

    res.status(200).json({
      message: "Logged in successfully",
      token: accessToken,
      username: username,
      verified: user.verified,
    });
    res.send();
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
};

exports.signGoogle = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const googleId = req.body.googleId;

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    console.log(user);

    if (!user) {
      throw new Error("User not found");
    }

    const userToken = { username: username };
    const accessToken = jwt.sign(userToken, "loginSecret", {
      expiresIn: "180m",
    });

    res.status(200).json({
      message: "Logged in successfully",
      token: accessToken,
      username: username,
      verified: user.verified,
      googleId: googleId,
    });
    res.send();
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
};
