import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./listItem.scss";
import { useSelector } from "react-redux";

export default function ListItem({ index, _id }) {
  const { MovieById } = useSelector((state) => state.movie);
  const [isHovered, setIsHovered] = useState(false);

  return (
    // <>A</>
    MovieById[_id] ? (
      <Link to={`/watch`} state={{ movie: MovieById[_id] }}>
        <div
          className="listItem"
          style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={MovieById[_id].img} alt="" />
          {isHovered && (
            <>
              <video src={MovieById[_id].trailer} autoPlay={true} loop />

              <div className="iteminfo">
                <div className="icons">
                  <PlayArrowIcon className="icon" />
                  <AddIcon className="icon" />
                  <ThumbUpOutlinedIcon className="icon" />
                  <ThumbDownAltOutlinedIcon className="icon" />
                </div>

                <div className="iteminfoTop">
                  <span>{MovieById[_id].limit}</span>
                  <span className="limit">{MovieById[_id].limit}</span>
                  <span>{MovieById[_id].year}</span>
                </div>

                <div className="desc">{MovieById[_id].title}</div>

                <div className="genre">{MovieById[_id].genre}</div>
              </div>
            </>
          )}
        </div>
      </Link>
    ) : (
      <>A</>
    )
  );
}
