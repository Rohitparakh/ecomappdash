const mongoose= require("mongoose");

//Schema
const Schema= mongoose.Schema;
const orderSchema=new Schema({
  "userId":String,
  "orderId":Number,
  "price":Number,
  "paymentStatus":String,
  "paymentMode":String,
  "date":Date,
  "orderProducts":[
      {
          "quantity": Number,
          "productId":String,
          "title":String,
          "price":Number,
      }
  ],
  "shipTo":{
      "name":String,
      "addressLine1":String,
      "addressLine2":String,
      "city":String,
      "state":String,
      "zip":Number
    }
})

// Model
const order=mongoose.model('order',orderSchema)

module.exports = order;