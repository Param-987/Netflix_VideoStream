const router = require('express').Router()
const WebSeries = require('../models/WebSeries')
const verify = require('../verifyToken')
const List = require('./../models/List')
const Movie = require('./../models/Movie')


// Create  
router.post('/', verify, async (req, res) => {
    const newWebSeries = req.body
    if (req.user.isAdmin) {
        try {
            const web = new WebSeries(newWebSeries);
            const webS = await web.save()
            res.status(201).json(webS)
        } catch (error) {
            console.log("Error",error)
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("U cannot add a movie")
    }
})

router.post('/addSeason/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body.episodes
    try {
        const updatedWeb = await WebSeries.findByIdAndUpdate(_id, {
            $push: { episodes: body }
        },
            { new: true })
            res.status(200).send(updatedWeb)
    } catch (error) {
        console.log(error)
        res.status(500).send("Incorrect Post Data")
    }

})
// update

router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedWeb = await WebSeries.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                }, {
                new: true
            })
            res.status(200).json(updatedWeb)
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
        const web = await WebSeries.findById(req.params.id)
        res.status(200).json(web)
    } catch (error) {
        res.status(500).json(error)
    }
})
// Get Random

router.get('/random', async (req, res) => {
    try {
        const web = await WebSeries.aggregate([
            { $sample: { size: 1 } }
        ])
        res.status(200).json(web)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GetAll
router.get('/', async (req, res) => {
    // if (req.user.isAdmin) {
        try {
            const allWeb = await WebSeries.find()
            res.status(200).json(allWeb.reverse())
        } catch (error) {
            res.status(500).json(error)
        }
    // } else {
    //     res.status(403).json("U are not allowed to call")
    // }
})

router.get('/series' , async (req,res)=>{
    // if(req.user.isAdmin){
        try {
            const movies = await Movie.find({isSeries:true})
            // console.log(first)
            res.status(200).json(movies.reverse()) 
        } catch (error) {
            res.status(500).json(error) 
        }
    // }else{
    //     res.status(403).json("U are not allowed")
    // }
})



module.exports = router