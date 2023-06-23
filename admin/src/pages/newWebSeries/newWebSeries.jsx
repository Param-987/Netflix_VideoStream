import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./newWebSeries.css";
// import {ref ,uploadBytes , getDownloadURL} from 'firebase/storage'
// import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { SeriesListContext } from "../../context/webSeriesContext/WebContext";
import { getOnlySeries, postSeries } from "../../context/webSeriesContext/apiCalls";


export default function NewList() {
  const [data, setData] = useState({});
  // const [trailer,setTrailer] = useState(null);
  const {seriesMovies,dispatch}=  useContext(SeriesListContext)
  // const [isupdated, setIsupdated] = useState(true);

  // const upload = (items)=>{
  //   items.forEach(item => {
  //       const fileName = new Date().getTime() + item.label + item.file.name
  //       // console.log(`/${movie.title}/${fileName}`)
  //       const storageRef = ref(storage,`/${item.title}/${fileName}`,item);
  //       uploadBytes(storageRef,item.file).then(()=>{
  //         getDownloadURL(storageRef).then((url)=>{
  //           setData((prev) => {return { ...prev, [item.label]: url };});
  //           setIsupdated((prev) => prev + 1);
  //         })
  //       }).catch((e)=>{
  //         console.log(e=>console.log(`Error came in uploadBytes ${e.message}`))
  //       })
  //   });
  // }

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   console.log(data)
  //   upload([
  //     { file: trailer, label: "trailer" },
  //   ]);
  // };

  const options = [
    { value: "Action", label: "Action" },
    { value: "Comedy", label: "Comedy" },
    { value: "Crime", label: "Crime" },
    { value: "Horror", label: "Horror" },
    { value: "Romance", label: "Romance" },
    { value: "Thriller", label: "Thriller" },
  ];

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    const sortedValue =value.sort((a,b)=>{
      return seriesMovies[a].title.toLowerCase() < seriesMovies[b].title.toLowerCase() ? -1 : 1
    })
    const finalVal = sortedValue.map((val)=>seriesMovies[val]._id)
    setData({...data,"episodes":[finalVal]})
  };

  const navigate = useNavigate();

  useEffect(() => {
    getOnlySeries(dispatch);
  }, [dispatch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data)
    postSeries(data,dispatch)
    navigate('/weblist')
  };


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Web Series List</h1>
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
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              name="desc"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Thumbnail</label>
            <input
              type="text"
              placeholder="Thumbnail"
              name="img"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Trailer</label>
            <input
              type="text"
              placeholder="trailer"
              name="trailer"
              onChange={handleChange}
              // onChange={(e) => setTrailer(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Year</label>
            <input
              type="text"
              placeholder="Year"
              name="year"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <Select
              options={options}
              isMulti={true}
              onChange={(e) => setData({...data,"genre":e.map((ev) => ev.value)})}
            />
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "400px" }}
            >
              {seriesMovies.length && seriesMovies.map((movie,key) => (
                <option
                  key={movie._id}
                  value={key}
                  className="optionList"
                >
                    {movie.title} | {movie.genre}
                </option>
              ))}
            </select>
          </div>
        </div>
        {
        //   isupdated === 0 ? (
        // <button className="addProductButton" onClickCapture={handleUpload}>
        //   Update
        // </button>
        //   ):
          (
        <button className="addProductButton" onClickCapture={handleSubmit}>
          Create
        </button>
          )
        }
      </form>
    </div>
  );
}

