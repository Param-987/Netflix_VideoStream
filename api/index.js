const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const movieRoute = require('./routes/movies')
const webRoute = require('./routes/webSeries')
const listRoute = require('./routes/list') 
let cors = require("cors");
app.use(cors());
dotenv.config();
 
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection created successfully"))
    .catch((err) => console.log(`Db Connection Error ${err}`))

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send({ "mesg": 1 })
})

app.use('/api/auth', authRoute)
app.use('/api/movie', movieRoute)
app.use('/api/web', webRoute)
app.use('/api/user', userRoute)
app.use('/api/list', listRoute)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Backend is running on ${port}`)
})
