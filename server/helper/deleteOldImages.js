const fs = require("fs");
const path = require("path");
const User = require("../models/user"); // Import your user model
const Quote = require("../models/quotes"); // Import your quote model
const Movie = require("../models/movie"); // Import your movie model

exports.deleteUnusedImages = async () => {
  try {
    // Step 1: Fetch all unique image filenames from users, quotes, and movies schemas
    const usersWithImages = await User.find({
      image: { $exists: true },
    }).distinct("image");
    const quotesWithImages = await Quote.find({
      image: { $exists: true },
    }).distinct("image");
    const moviesWithImages = await Movie.find({
      image: { $exists: true },
    }).distinct("image");

    const imagesInDatabase = [
      ...usersWithImages,
      ...quotesWithImages,
      ...moviesWithImages,
    ];

    // Step 2: Get a list of all image files in the storage directory
    const storageDirectory = path.join(__dirname, "..", "uploads", "images");
    const allImagesInDirectory = fs.readdirSync(storageDirectory);

    // Step 3: Compare the two lists and delete unused images
    for (const imageFilename of allImagesInDirectory) {
      if (!imagesInDatabase.includes(imageFilename)) {
        const imagePath = path.join(storageDirectory, imageFilename);
        fs.unlinkSync(imagePath);
        // console.log(`Deleted unused image: ${imageFilename}`);
      }
    }
  } catch (err) {
    console.error("Error deleting unused images:", err);
  }
};
