import { Link, useLocation } from "react-router-dom";
// import { SeriesListContext } from "../../context/webSeriesContext/WebContext";
import { SeriesListContext } from "../../context/webSeriesContext/WebContext";
import "./EditWebList.css";
import { useContext, useEffect, useState } from "react";
import { getOnlySeries } from "../../context/webSeriesContext/apiCalls";
import { logicalSort } from "../../context/movieContext/apiCalls";

export default function EditWebList() {
  const location = useLocation();
  const { weblist } = location.state;
  const [selected, setIsSelected] = useState(0);
  const { seriesMovies, dispatch } = useContext(SeriesListContext);

  const season =
    seriesMovies.length > 0 &&
    weblist.episodes[selected]
      .map((epi, key) => seriesMovies.filter((item) => item._id === epi)[0])
      .sort(logicalSort)

    console.log(season)
  useEffect(() => {
    if (seriesMovies.length === 0) getOnlySeries(dispatch);
  }, [dispatch,seriesMovies]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">{weblist.title}</h1>
        <Link
          to={`/weblist/${weblist._id}/addNewSeason`}
          state={{ _id: weblist._id }}
        >
          <button className="productAddButton">Add New Season</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{weblist._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span
                className="productInfoValue"
                style={{ whiteSpace: "nowrap" }}
              >
                {weblist.genre.join(" , ")}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Description:</span>
              <span
                className="productInfoValue"
                style={{ whiteSpace: "nowrap" }}
              >
                {weblist.desc}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">No of Season:</span>
              <span className="productInfoValue">
                {weblist.episodes.length}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Episodes:</span>
              <span
                className="productInfoValue"
                style={{ whiteSpace: "nowrap" }}
              >
                {weblist.episodes
                  .map(
                    (arr, id) => `Season ${id + 1} ( ${arr.length} Episodes)`
                  )
                  .join(" ,")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <div>
          {weblist.episodes.map((epi, key) => (
            <span
              key={key}
              className={`productSeason ${selected === key && "active"}`}
              onClick={() => setIsSelected(key)}
            >
              Season {key + 1}
            </span>
          ))}
        </div>
        {season && (
          <div>
            <ol id="myList">
              {season.map((e, id) => (
                <Link
                  to={`/product/${e._id}`}
                  state={{ movie: e, _id: e._id }}
                  key={id}
                >
                  <li>{e.title}</li>
                </Link>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
