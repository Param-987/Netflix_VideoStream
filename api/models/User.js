const mongoose = require("mongoose")
 
const UserSchema = new mongoose.Schema({
    username : {type:String,required:true,unique:true},
    _id:{type:String},
    // email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    fullname:{type:String,default:""},
    profilePic:{type:String,default:""},
    isAdmin:{type:Boolean,default:false},
},{
    timestamps:true
},{ _id: false })

module.exports = mongoose.model("User",UserSchema)