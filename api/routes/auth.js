const router = require('express').Router()
const { model } = require('mongoose')
const User = require('../models/User')
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

// Register 

router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        _id:req.body.email,
        // email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        isAdmin: req.body.isAdmin,
        fullname: req.body.fullname
    })

    try {
        const user = await newUser.save()
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.Secret_key,
            { expiresIn: "5d" }
        )
        const { password, ...args } = user._doc
        res.status(201).json({ ...args, accessToken })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// Login 

router.post('/login', async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body.email })
        if (!user) {
            return res.status(401).send("Wrong password or Username")
        }

        // const bytes = CryptoJS.AES.decrypt(user.password, process.env.Secret_key);
        // const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.Secret_key,
            { expiresIn: "5d" }
        )

        const { password, ...info } = user._doc
        bcrypt.compare(req.body.password, user.password,(err,result)=>{
            if(err) res.status(403).json("Internal Server Error")
            result ? res.status(200).json({ ...info, accessToken }) :
            res.status(401).json("Wrong password or Username")
        })
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router