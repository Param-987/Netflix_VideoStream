const router = require('express').Router()
const Movie = require('../models/Movie')
const verify = require('../verifyToken')
const List = require('./../models/List')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const mongourl = process.env.MONGO_URL
const WebSeries = require('./../models/WebSeries')
const dbName = 'test'
const collectionName = "movies"

// router.get('/changeGenre',async (req,res)=>{
//     MongoClient.connect(mongourl,(err,client)=>{
//         if(err) console.log(err)
//         const db = client.db(dbName)
//         const collection = db.collection(collectionName)
//         collection.find().forEach(document => {
//             // Convert the "Genre" field from string to array
//             const genresArray = [document.genre]
//             console.log(genresArray)

//             // Update the document with the new "Genre" array
//             collection.updateOne(
//               { _id: document._id },
//               { $set: { genre: genresArray } }
//             );
//           });
//           res.send("hello")
//     })
// })


// Create
router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body)

        try {
            const movie = await newMovie.save()
            res.status(201).json(movie)

        } catch (error) {
            res.status(500).json(error)

        }

    }
    else {
        res.status(403).json("U cannot add a movie")
    }
})
// update

router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                }, {
                new: true
            })
            res.status(200).json(updatedMovie)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("U cannot update a movie")
    }
})


// delete

const deleteMovieFromList = async (id) => {
    try {
        await List.updateMany({ content: id, }, { $pull: { content: id } })
        await List.deleteMany({ content: { $exists: true, $size: 0 } })
        console.log('Deleted Successfully')
    } catch (error) {
        console.log("Error In deletion", error)
    }

}

router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id)
            await deleteMovieFromList(req.params.id)
            res.status(200).json("Movie Deleted Successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("U cannot delete the movie")
    }
})

// Get

router.get('/find/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }
})
// Get Random

router.get('/random', async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === 'series') {
            movie = await WebSeries.aggregate([
                // { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ])
        } else if (type === 'movies') {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ])
        } else {
            movie = await Movie.aggregate([
                {$match:{isSeries:false}},
                { $sample: { size: 1 } }
            ])
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GetAll
router.get('/', async (req, res) => {
        try {
            const movies = await Movie.find({isSeries:false})
            res.status(200).json(movies.reverse())
        } catch (error) {
            res.status(500).json(error)
        }
})

module.exports = router