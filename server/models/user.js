const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("users", userSchema);
