const passport = require('passport')
const Google = require("passport-google-oauth20")
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const clientID = "281815424646-gk7gn8udovt24io6mglvnvlr0k1e1fql.apps.googleusercontent.com"
const clientSecret = "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"

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

passport.use(new Google({
    clientID:clientID,
    clientSecret:clientSecret,
    callbackURL: "/auth/google/callback"
},(accessToken,refreshToken,profile,done)=>{
    // console.log(profile._json)
    done(null,profile._json)
}))