import "./featured.scss";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getrandomMovie } from "../../Functions/Home";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Featured = ({ setGenre, type }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    getrandomMovie(type, setContent);
  }, [type]);

  return (
    <div className="featured">
      {type && Object.keys(content).length && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
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
        <img src={content.imgSmall} alt=""  />
        {/* <LazyLoadImage
          src={content.img}
          alt={"No Image Found"}
          // effect="blur"
          // placeholderSrc={content.img}
          // width={"100%"}
          // height="100%"
        /> */}

        <span className="desc">{content.desc}</span>

        <div className="button">
          <Link to={"/watch"} state={{ movie: content }}>
            <button className="play">
              <PlayArrowIcon />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
