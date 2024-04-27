const express = require('express');
""
const Category = require("../Model/category.model");
const categories = require("../data/category");

const router = express.Router();

router.route('/')
.post(async (req, res) => {
    try {
        await Category.deleteMany(); // Correct method for deleting all data
        const categorieindb = await Category.insertMany(categories.data); // Ensure data structure is correct
        res.json(categorieindb);
    } catch (err) {
        console.error("category insertion error:", err); // Detailed logging
        res.status(500).json({
            message: "categories could not be added",
        });
    }
});

module.exports = router;