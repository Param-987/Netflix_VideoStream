const router = require("express").Router()
require('./../passport/google')
const passport = require('passport')
const jwt = require('jsonwebtoken')


router.get('/login/success', (req, res) => {
    if(req.user){
        console.log(req.user)
        const accessToken = jwt.sign({
            id: req.user.email,
            isAdmin: false
        },
            process.env.Secret_key,
            { expiresIn: "5d" }
        )
         res.status(200).json({...req.user ,accessToken})
    }
})

router.get('/google', passport.authenticate('google', {
    scope: ["profile","email"]
}))

router.get('/login/failed', (req, res) => {
    console.log("failed")
    res.status(200).send({ "mesg": 0 })
})

router.get('/google/callback', passport.authenticate('google',{
    successRedirect:"https://netflix-video-stream.vercel.app/",
    failureRedirect:'/login/failed'
}))

module.exports = router