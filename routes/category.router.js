const express = require('express');
const router = express.Router();
const Categories = require('../Model/category.model');// Assuming this is your Mongoose model

router.route("/")
  .get(async (req, res) => {
    const categorya = req.query.category;
    try {
      let categories
      if(categorya)
       {{categories = await Categories.find({category:categorya}); }}// Fetching all hotels
      else{
        categories = await Categories.find({});
      }
      if (!categories || categories.length === 0) {
        return res.status(404).json({ message: "No hotel categories found" });
      }

      res.status(200).json(categories); // Return the hotel data as JSON
    } catch (err) {
      console.error("Error fetching hotel categories:", err);
      res.status(500).json({ message: "An error occurred while fetching hotel categories" });
    }
  });

module.exports = router;
