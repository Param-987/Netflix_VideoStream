import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import {  useSelector } from "react-redux";
// import { getAllMovie } from "../../redux/MovieRedux/apicalls";
import { getVideoDuration, getDurationFormat, getArraySorted } from "../../Functions/Watch";

const Watch = () => {
  const sliderRef = useRef(null);
  const [isScroll, setIsScroll] = useState(false);
  const [isActive, setIsActive] = useState(0);
  const { MovieById } = useSelector((state) => state.movie);
  const [limit, setLimit] = useState(0);
  const [currId, setCurrId] = useState(null);

  const location = useLocation();
  const { movie } = location.state;

  useEffect(() => {
    sliderRef.current?.slickGoTo(0);
  }, [isActive]);

  useEffect(() => {
    if (!movie.episodes) setCurrId(movie._id);
    else setCurrId(MovieById[movie.episodes[0][0]]._id);
  }, [MovieById, movie]);


  useEffect(() => {
    currId &&
      getVideoDuration(MovieById[currId].video).then((dur) => setLimit(dur));
  }, [currId, MovieById]);

  const CustomPrevButton = ({ onClick }) => (
    <ArrowBackIosOutlinedIcon
      className="sliderArrow custom-prev-button left "
      onClick={() => {
        onClick();
      }}
    />
  );

  const Cus = () => {};
  const CustomForwButton = ({ onClick }) => (
    <ArrowForwardIosOutlinedIcon
      className="sliderArrow custom-prev-button right"
      onClick={() => {
        setIsScroll(true);
        onClick();
      }}
    />
  );

  const settings = {
    dots: false,
    speed: 1000,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 2, // Move one movie backward on the next slide
    swipeToSlide: true,

    prevArrow: isScroll ? <CustomPrevButton /> : <Cus />,
    nextArrow: <CustomForwButton />,
  };
  return (
    <div className="watch">
      <Link to={"/"}>
        <div className="back">
          <ArrowBackOutlinedIcon />
          Home
        </div>
      </Link>

      {currId && (
        <video
          className="video"
          src={MovieById[currId].video}
          autoPlay
          progress="true"
          controls
        />
      )}

      {currId && (
        <div className="current-video">
          <div className="title">{MovieById[currId].title}</div>
          <div className="desc">
            {MovieById[currId].desc} • {getDurationFormat(limit)}
          </div>
          <div className="genre">{MovieById[currId].genre.join(" • ")}</div>
        </div>
      )}

      {
        // movie.episodes && movie.episodes[isActive].map((_id,key)=>(<span>{key}</span>))
      }

      {movie.episodes && (
        <div className="web-season">
          {movie.episodes.map((epi, key) => (
            <span
              key={key}
              className={`seasons ${isActive === key && "active"}`}
              onClick={() => setIsActive(key)}
            >
              Season {key + 1}
            </span>
          ))}
        </div>
      )}
      <div className="wrapper">
        {movie.episodes && Object.keys(MovieById).length && (
          <Slider {...settings} ref={sliderRef}>
            {getArraySorted(movie.episodes[isActive],MovieById).map((_id, index) => (
              <div
                className="image-container"
                key={index}
                onClick={(e) => setCurrId(_id)}
              >
                <img
                  src={MovieById[_id].img}
                  alt=""
                  className="movie-image"
                  width={"100px"}
                />
                <div className="movie-detail">
                  <div className="movie-desc">{MovieById[_id].desc}</div>
                  <div className="movie-title">{MovieById[_id].title}</div>
                  <div className="movie-title">{MovieById[_id].genre.join(" • ")}</div>
                    {/* <span style={{ margin: 0 }}></span> */}
                    {/* <span style={{ marginLeft: "10px" }}> */}
                      {/* • {MovieById[_id].genre.join(" • ")} */}
                    {/* </span> */}
                  {/* </div> */}
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Watch;
