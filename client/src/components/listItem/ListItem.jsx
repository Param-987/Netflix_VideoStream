import { Add, PlayArrow, ThumbUpAltOutlined ,ThumbDownOutlined } from '@material-ui/icons'
import axios from 'axios'
import { useState ,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './listItem.scss'

export default function ListItem({index,item}) {

    const [movie, setMovie] = useState({})

    useEffect(()=>{
        const getMovie = async () =>{
            try {
                const res = await axios.get(`movie/find/${item}`,
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
            <PlayArrow className='icon'/>
            <Add className='icon'/>
            <ThumbUpAltOutlined className='icon'/>
            <ThumbDownOutlined className='icon'/>
        </div>

        <div className="iteminfoTop">
            <span>{movie.limit}</span>
            <span className='limit'>{movie.limit}</span>
            <span>{movie.year}</span>
        </div>

        <div className="desc">
           {movie.desc}
        </div>

        <div className="genre">
            Action
        </div>
        </div>
    </>
    )}

    </div>
    </Link>
  )
}
