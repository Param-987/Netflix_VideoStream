const router = require('express').Router()
const { model } = require('mongoose')
const User = require('../models/User')
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

// Register 

router.post('/register',async (req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.Secret_key).toString(),
        isAdmin:req.body.isAdmin,
        fullname:req.body.fullname
    })

    try {
        const user = await newUser.save()

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin :user.isAdmin
        },
        process.env.Secret_key,
        {expiresIn:"5d"}
        )
        const {password, ...args} = user._doc
        res.status(201).json({...args,accessToken})
    } catch (error) {
        res.status(500).json(error)
        
    }
})
 
// Login 

router.post('/login',async (req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(401).send("Wrong password or Username")
        }

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.Secret_key);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin :user.isAdmin
        },
        process.env.Secret_key,
        {expiresIn:"5d"}
        )
    
        const {password,...info} = user._doc 

        originalPassword !== req.body.password ?
        res.status(401).json("Wrong password or Username") :
        res.status(200).json({...info,accessToken})
 
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router