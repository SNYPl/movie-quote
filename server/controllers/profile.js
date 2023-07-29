const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Quote = require("../models/quotes");
const { deleteUnusedImages } = require("../helper/deleteOldImages");

exports.updateUsername = async (req, res, next) => {
  const username = req.user.username;
  const image = req.file?.filename;
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  let payload = {
    username: newUsername,
    email: newEmail,
    password: req.body.password !== "undefined" ? hashedPassword : newPassword,
    image: image || "undefined",
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
      accessToken = jwt.sign(userToken, process.env.SECRET_LOGIN, {
        expiresIn: "180m",
      });
      newUser = updateObj.username;
    }

    const userUpdatingPhoto = newUser?.username ? newUser.username : username;

    await updateCommentAuthorImage(userUpdatingPhoto, image);
    await updateNotificationAuthorImage(userUpdatingPhoto, image);
    deleteUnusedImages();

    return res.status(200).json({
      message: "account updated",
      img: image,
      token: accessToken,
      username: newUser,
    });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
async function updateCommentAuthorImage(userId, newImage) {
  try {
    const quotes = await Quote.find({
      "comments.commentAuthor.username": userId,
    });

    for (const quote of quotes) {
      let updated = false; // Flag to check if any comment is updated

      for (const comment of quote.comments) {
        if (comment.commentAuthor.username === userId) {
          comment.commentAuthor.image = newImage;
          updated = true;
        }
      }

      if (updated) {
        quote.markModified("comments"); // Mark the 'comments' array as modified
        try {
          await quote.save();
        } catch (err) {
          console.error("Error saving quote:", err);
        }
      }
    }
  } catch (err) {
    console.error("Error updating commentAuthor image:", err);
  }
}
async function updateNotificationAuthorImage(userId, newImage) {
  try {
    const quotes = await Quote.find({ "notifications.author.name": userId });

    for (const quote of quotes) {
      let updated = false; // Flag to check if any notification is updated

      for (const notification of quote.notifications) {
        if (notification.author.name === userId) {
          notification.author.image = newImage;
          updated = true;
        }
      }

      if (updated) {
        quote.markModified("notifications"); // Mark the 'notifications' array as modified
        try {
          await quote.save();
        } catch (err) {
          console.error("Error saving quote:", err);
        }
      }
    }
  } catch (err) {
    console.error("Error updating notification authorImage:", err);
  }
}
