const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require("cors");
const session = require('express-session');
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./passport/google')
dotenv.config();

app.use(cors({
    origin: 'https://netflix-video-stream.vercel.app',
    credentials: true
}));

const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const movieRoute = require('./routes/movies')
const webRoute = require('./routes/webSeries')
const listRoute = require('./routes/list')
const googleAuthRoute = require('./routes/googleAuth')

app.set("trust proxy", 1)
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection created successfully"))
    .catch((err) => console.log(`Db Connection Error ${err}`))




app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
// app.use(cors())
// app.use(cors({ origin: '*' }));

// app.use(cors({
//     origin:"https://netflix-video-stream.vercel.app/",
//     methods:"GET,POST,PUT,DELETE",
//     credentials:true
// }));


app.use('/api/auth', authRoute)
app.use('/api/movie', movieRoute)
app.use('/api/web', webRoute)
app.use('/api/user', userRoute)
app.use('/api/list', listRoute)
app.use('/auth', googleAuthRoute)


app.get('/', async (req, res) => {
    res.status(200).send({ "mesg": 1 })
})


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Backend is running on ${port}`)
})
