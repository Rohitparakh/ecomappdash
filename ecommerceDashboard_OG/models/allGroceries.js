const mongoose = require("mongoose");

//Schema
const Schema= mongoose.Schema;
const allGroceriesSchema = new Schema({
    id: Number,
    title: String,
    handle: String,
    description: String,
    categories: Array,
    tags: Array,
    featuredImageId: String,
    images: Array,
    priceTaxExcl: Number,
    priceTaxIncl: Number,
    taxRate: Number,
    comparedPrice: Number,
    quantity: Number,
    sku: String,
    mrp: Number,
    extraShippingFee: Number,
    offer: Boolean,
    active: Boolean
})

// Model
const allGroceries=mongoose.model('allGroceries',allGroceriesSchema)

module.exports = allGroceries;