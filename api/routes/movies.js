const router = require('express').Router()
const Movie = require('../models/Movie')
const verify = require('../verifyToken')


// Create
router.post('/',verify ,async (req,res)=>{
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body)

        try {
        const movie = await newMovie.save()
        res.status(201).json(movie)
            
        } catch (error) {
            res.status(500).json(error)
            
        }

    }
    else{
        res.status(403).json("U cannot add a movie")
    }
})
// update

router.put('/:id',verify , async (req,res)=>{
    if(req.user.isAdmin){
        try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,
            {
                $set:req.body
            },{
                new:true
            })
            res.status(200).json(updatedMovie) 
        } catch (error) {
            res.status(500).json(error) 
        }
    }else{
        res.status(403).json("U cannot update a movie")
    }
})

// delete

router.delete('/:id',verify,async (req,res)=>{
    if(req.user.isAdmin){
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("Movie Deleted Successfully") 
        } catch (error) {
            res.status(500).json(error) 
        }
    }else{
        res.status(403).json("U cannot delete the movie") 
    }
})
// Get

router.get('/find/:id',async (req,res)=>{
        try {
            const movie = await Movie.findById(req.params.id)
            res.status(200).json(movie) 
        } catch (error) {
            res.status(500).json(error) 
        }
})
// Get Random

router.get('/random',async (req,res)=>{
    const type = req.query.type;
    let movie;  
        try {
           if(type === 'series'){
            movie = await Movie.aggregate([
                {$match:{isSeries:true }},
                {$sample:{size:1}}
            ])
           }else if(type=== 'movies'){
            movie = await Movie.aggregate([
                {$match:{isSeries:false }},
                {$sample:{size:1}}
            ])
           }else{
            movie = await Movie.aggregate([
                {$sample:{size:1}}
            ])
           }
           res.status(200).json(movie)
        } catch (error) {
            res.status(500).json(error) 
        }
})

// GetAll
router.get('/',verify , async (req,res)=>{
    if(req.user.isAdmin){
        try {
            const movies = await Movie.find()
            res.status(200).json(movies.reverse()) 
        } catch (error) {
            res.status(500).json(error) 
        }
    }else{
        res.status(403).json("U cannot delete the movie")
    }
})



module.exports = router