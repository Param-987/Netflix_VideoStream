import { useContext } from "react";
import { useState } from "react";
import "./AddNewSeason.css";
import { useLocation, useNavigate } from "react-router-dom";
import { SeriesListContext } from "../../context/webSeriesContext/WebContext";
import { addSeason } from "../../context/webSeriesContext/apiCalls";

export default function AddNewSeason() {
  const [episodes, setEpisodes] = useState([]);
  const { seriesMovies, dispatch: dispatchSeries } =
    useContext(SeriesListContext);

  const SeriesId = useLocation().state._id;
  const navigate = useNavigate();

  const handleSelect = (e) => {
    let episode = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setEpisodes(episode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addSeason(SeriesId, episodes, dispatchSeries);
    navigate(`/`);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "400px" }}
            >
              {seriesMovies.map((movie, id) => (
                <option key={movie._id} value={movie._id} className="optionList">
                  {movie.title} | {movie.genre}
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

// <div className="addProductItem">
//   <label>Season 1</label>
//   <Select
//     options={movieOptions}
//     isMulti={true}
//     onChange={(e) => setEpisodes(e.map((ev) => ev.value))}
//   />
// </div>
