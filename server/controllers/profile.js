const User = require("../models/user");

exports.uploadPhoto = async (req, res, next) => {
  const username = req.user.username;
  const img = req.body.image;

  try {
    const user = await User.findOneAndUpdate(
      { username: username },
      { image: img }
    );

    if (!user) return res.status(401).send("something problem");

    return res.status(200).send({ message: "image uploaded", img: img });
  } catch (err) {
    return res.status(401).send({ message: "some problems" });
  }
};
