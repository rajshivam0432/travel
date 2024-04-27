const mongoose = require('mongoose');

const hotelschema = new mongoose.Schema({
    city: { type: String, required: true }
})

const hellolist = mongoose.model("hellolist", hotelschema);

module.exports = hellolist;