const express  = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DB connection created successfully"))
.catch((err)=> console.log(`Db Connection Error ${err}`))

app.use(express.json())

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)

 

app.listen(8800,()=>{
    console.log('Backend is running')
})