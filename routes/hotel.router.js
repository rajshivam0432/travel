const express = require('express');
const router = express.Router();
const Hotels = require('../Model/hotel.model');// Assuming this is your Mongoose model

router.route("/")
  .get(async (req, res) => {
    try {
      const hotelData = await Hotels.find(); // Fetching all hotels
      
      if (!hotelData || hotelData.length === 0) {
        return res.status(404).json({ message: "No hotel categories found" });
      }

      res.status(200).json(hotelData); // Return the hotel data as JSON
    } catch (err) {
      console.error("Error fetching hotel categories:", err);
      res.status(500).json({ message: "An error occurred while fetching hotel categories" });
    }
  });

module.exports = router;
