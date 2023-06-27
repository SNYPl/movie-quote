const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.updateUsername = async (req, res, next) => {
  const username = req.user.username;
  const image = req.body.image;
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  let payload = {
    username: newUsername,
    email: newEmail,
    password: req.body.password !== "undefined" ? hashedPassword : newPassword,
    image: image,
  };

  let updateObj = {};

  for (let [key, value] of Object.entries(payload)) {
    if (value !== "undefined") {
      updateObj[key] = value;
    }
  }

  try {
    const user = await User.findOneAndUpdate(
      { $or: [{ username }, { email: username }] },
      updateObj,
      {
        new: true,
        ignoreUndefined: true,
      }
    );

    if (!user) return res.status(401).send("can't find username");

    let accessToken;
    let newUser;

    if (updateObj.username !== undefined) {
      const userToken = { username: updateObj.username };
      accessToken = jwt.sign(userToken, "loginSecret", {
        expiresIn: "180m",
      });
      newUser = updateObj.username;
    }

    return res.status(200).send({
      message: "account updated",
      img: image,
      token: accessToken,
      username: newUser,
    });
  } catch (err) {
    return res.status(401).send({ message: "some problems" });
  }
};
