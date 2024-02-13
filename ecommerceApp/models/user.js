const mongoose= require("mongoose");

//Schema
const Schema= mongoose.Schema;
const userSchema=new Schema({
    name:{type: String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    phone:{type:Number,required:true},
    addressLine1:{type:String, required:true},
    addressLine2:{type:String, required:true},
    isAdmin:{type:Boolean, default:false}
},{
    timestaps:true
})

// Model
const user=mongoose.model('user',userSchema)

module.exports = user;