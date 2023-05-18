 import "./featured.scss";

import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Featured = ({type}) => {

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
  console.log(content)
  return (
  <div className="featured">
    {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
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
                <PlayArrow/>
                <span>Play</span>
            </button>
              </Link>
            <button className="more">
                <InfoOutlined/>
                <span>Info</span>
                
            </button>
        </div>
    </div>
    </div>
    
    );
};

export default Featured;
