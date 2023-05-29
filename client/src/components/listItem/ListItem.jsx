import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import axios from 'axios'
import { useState ,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './listItem.scss'

export default function ListItem({index,item}) {

    const [movie, setMovie] = useState({})

    useEffect(()=>{
        const getMovie = async () =>{
            try {
                const res = await axios.get(`http://18.204.215.48:5000/api/movie/find/${item}`,
                {
                    headers:{
                      token:"Bearer " + JSON.parse(localStorage.getItem('user')).accessToken
                    }
                  })
                  setMovie(res.data) 
            } catch (error) {
                console.log(error);
            }
        }
        getMovie();
    },[item])

    // console.log(movie)

    const [isHovered , setIsHovered] = useState(false)
    
  return (
    <Link to={`/watch`} state = {{movie:movie}}>
    <div className='listItem' 
    style = {{left:isHovered && index * 225 - 50 + index * 2.5 }}
    onMouseEnter={()=>{setIsHovered(true)}} 
    onMouseLeave = {()=> setIsHovered(false)}>
        <img src={movie.img} alt="" />
        { isHovered && (
            <>
        <video src={movie.trailer}  autoPlay = {true} loop/>

    <div className="iteminfo">
        <div className="icons">
            <PlayArrowIcon className='icon'/>
            <AddIcon className='icon'/>
            <ThumbUpOutlinedIcon className='icon'/>
            <ThumbDownAltOutlinedIcon className='icon'/>
        </div>

        <div className="iteminfoTop">
            <span>{movie.limit}</span>
            <span className='limit'>{movie.limit}</span>
            <span>{movie.year}</span>
        </div>

        <div className="desc">
           {movie.title}
        </div>

        <div className="genre">
            {movie.genre}
        </div>
        </div>
    </>
    )}

    </div>
    </Link>
  )
}
