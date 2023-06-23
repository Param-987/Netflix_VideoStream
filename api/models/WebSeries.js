const mongoose = require("mongoose")  

const WebSeriesSchema = new mongoose.Schema({
    title : {type:String,required:true,unique:true},
    desc : {type:String},
    img : {type:String},
    trailer : {type:String},
    year : {type:String},
    genre:{type:[String]},
    // season:{type:Number,required:true,default:1},
    // noOfEpisodes:{type:[Number],required:true},
    episodes:{type:[[String]],required:true},
},{
    timestamps:true
})

module.exports = mongoose.model("WebSeries",WebSeriesSchema)