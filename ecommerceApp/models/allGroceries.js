const mongoose = require("mongoose");

//Schema
const Schema= mongoose.Schema;
const allGroceriesSchema = new Schema({
    id: Number,
    media: Array,
    collections: Array,
    tags: Array,
    title: String,
    imgSrc: String,
    price: Number,
    mrp: Number,
    offer: Boolean,
    status: Boolean,
    description: String
})

// Model
const allGroceries=mongoose.model('allGroceries',allGroceriesSchema)

module.exports = allGroceries;