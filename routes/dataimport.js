const express = require('express');

const hotel = require("../Model/hotel.model");
const hotels = require("../data/Hotel");

const router = express.Router();

router.route('/')
.post(async (req, res) => {
    try {
        await hotel.deleteMany(); // Correct method for deleting all data
        const hotelsInDb = await hotel.insertMany(hotels.data); // Ensure data structure is correct
        res.json(hotelsInDb);
    } catch (err) {
        console.error("Data insertion error:", err); // Detailed logging
        res.status(500).json({
            message: "Data could not be added",
        });
    }
});

module.exports = router;