const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signIn = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
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

    res.status(200).json({
      message: "Logged in successfully",
      token: accessToken,
      username: username,
      verified: user.verified,
    });
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
};
