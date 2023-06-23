import { useContext,useState,useEffect} from "react";
import { createList } from "../../context/ListContext/apiCalls";
import { ListContext } from "../../context/ListContext/ListContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MoviesContext } from "../../context/movieContext/MovieContext";
import {SeriesListContext} from "../../context/webSeriesContext/WebContext"
import "./newList.css";
import { useNavigate } from "react-router-dom";
import { getWeb } from "../../context/webSeriesContext/apiCalls";
import Select from "react-select"

export default function NewList() {
  const [list, setList] = useState({});
  const navigate = useNavigate();

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MoviesContext);
  const {seriesList,dispatch:dispatchSeries} = useContext(SeriesListContext)

  useEffect(() => {
    getMovies(dispatchMovie);
    getWeb(dispatchSeries);
  }, [dispatchMovie,dispatchSeries]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    navigate("/lists");
  };

  const options = [
    { value: "Action", label: "Action" },
    { value: "Comedy", label: "Comedy" },
    { value: "Crime", label: "Crime" },
    { value: "Horror", label: "Horror" },
    { value: "Romance", label: "Romance" },
    { value: "Thriller", label: "Thriller" },
  ];


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <Select
              options={options}
              isMulti={true}
              onChange={(sel) =>setList({...list,"genre":sel.map(opt=>opt.value)})}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movies">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {[...movies,...seriesList].map((movie) => (
                // <div >
                <option
                  key={movie._id}
                  value={movie._id}
                  className="optionList"
                >
                  {movie.title}        |         {movie.genre.join(" , ")}
                </option>
                  // </div>  
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClickCapture={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
