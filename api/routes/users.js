const router = require('express').Router()
const User =  require('../models/User')
const CryptoJS = require("crypto-js");
const verify = require('../verifyToken')

// update 
router.put('/:id',verify,async (req,res)=>{
    if(req.user.id === req.params.id || req.body.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.Secret_key).toString()
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{
                new:true
            })
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("U can update only ur account")
    }
})
// delete
router.delete('/:id',verify, async (req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("U can delete only ur account")
    }
})
// get
router.get('/find/:id',async (req,res)=>{
        try {
            const user = await User.findById(req.params.id)
            const {password,...info} = user._doc 
            res.status(200).json(info)
        } catch (error) {
            res.status(500).json(error)
        }
})
// Get ALL
router.get('/',verify,async (req,res)=>{
    const query = req.query.new
    if(req.user.isAdmin){
        try {
            const user = query ? await User.find().sort({id:-1}).limit(10) : await User.find()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("You are not allowed to see all users")
    }
})

// Get User Stats
// router.get('/stats',async (req,res)=>{
//     const today = new Date();
//     const lastYear = today.setFullYear(today.setFullYear()-1)
//     const monthArray = ['']
// })
module.exports = router