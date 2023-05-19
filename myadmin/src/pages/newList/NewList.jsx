import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createList } from "../../context/ListContext/apiCalls";
import { ListContext } from "../../context/ListContext/ListContext";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import { MoviesContext } from "../../context/movieContext/MovieContext";
import "./newList.css";
import { useNavigate } from "react-router-dom";

export default function NewList() {
  const [list, setList] = useState(null);
  const navigate = useNavigate();

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MoviesContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

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
            <input
              type="text"
              placeholder="action"
              name="genre"
              onChange={handleChange}
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
              {movies.map((movie) => (
                <option
                  key={movie._id}
                  value={movie._id}
                  className="optionList"
                >
                  <div>{movie.title}        |         {movie.genre}</div>  
                </option>
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
