const mongoose = require("mongoose");
const { Schema } = mongoose;

const quoteSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  textGeo: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    unique: true,
  },
  likes: {
    type: Number,
  },
  comments: [{
    author: String,
    text:String,
 }]
  
  
},
{
  collection:"quotes"
});

module.exports = mongoose.model("quote", quoteSchema);
