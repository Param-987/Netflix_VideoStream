 import "./featured.scss";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Featured = ({setGenre , type}) => {

  const [content,setContent] = useState({})

  useEffect(()=>{
    const getrandomMovie = async ()=>{
      try {
        const res = await axios.get(`movie/random?type=${type}`)
        setContent(res.data[0])
      } catch (error) {
        console.log(error);
      }
    }
    getrandomMovie();
  },[type])
  return (
  <div className="featured">
    {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre"onChange={(e) => setGenre(e.target.value)} >
            <option>Genre</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
          </select>
        </div>
      )}
    <img src={content.img} alt="" />

    <div className="info">
        <img src={content.imgSmall} alt="" />

        <span className="desc">
          {content.desc}
        </span>

        <div className="button">
              <Link to={'/watch'} state = {{movie:content}}>
            <button className="play">
                <PlayArrowIcon/>
                <span>Play</span>
            </button>
              </Link>
            <button className="more">
                <InfoOutlinedIcon/>
                <span>Info</span>
                
            </button>
        </div>
    </div>
    </div>
    
    );
};

export default Featured;
