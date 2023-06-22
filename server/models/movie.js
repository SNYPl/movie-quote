const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: String,
    required: true,
  },
  genre: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,

  },
  director:{
    type:String,
    required: true,

  },
  budget:{
    type:String,
    required: true,

  },
  quotes:{
    type:Array,
    required: true,

  },
  
},
{
  collection:"movies"
});

module.exports = mongoose.model("movie", movieSchema);
