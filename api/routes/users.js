const router = require('express').Router()
const User =  require('../models/User')
const CryptoJS = require("crypto-js");
const verify = require('../verifyToken')

// update
router.put('/:id',verify,async (req,res)=>{
    console.log(req.body,req.user);
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

module.exports = router