const jwt = require("jsonwebtoken");

function verify(req,res,next) {
    const authHeader = req.headers.token
    console.log(authHeader)
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.Secret_key,(err,user)=>{
            if(err){
                 return res.status(403).json("Token is not valid")
            }
            else{
                console.log("hello")
                 req.user = user
            }
            next();
        })
    }else{
        return res.status(401).json("U are not authenticated")
    }         
}  
module.exports = verify 