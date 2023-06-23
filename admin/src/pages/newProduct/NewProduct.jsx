import { useContext } from "react";
import { useState } from "react";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MoviesContext } from "../../context/movieContext/MovieContext";
// import storage from "../../firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./newProduct.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  // const [trailer, setTrailer] = useState(null);
  // const [video, setVideo] = useState(null);
  // const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(MoviesContext);
  const navigate = useNavigate();

  const options = [
    { value: "Action", label: "Action" },
    { value: "Comedy", label: "Comedy" },
    { value: "Crime", label: "Crime" },
    { value: "Horror", label: "Horror" },
    { value: "Romance", label: "Romance" },
    { value: "Thriller", label: "Thriller" },
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };
  // const upload = (items)=>{
  //   items.forEach(item => {
  //       const fileName = new Date().getTime() + item.label + item.file.name
  //       // console.log(`/${movie.title}/${fileName}`)
  //       const storageRef = ref(storage,`/Stranger things S2/${fileName}`,item);
  //       uploadBytes(storageRef,item.file).then(()=>{
  //         getDownloadURL(storageRef).then((url)=>{
  //           setMovie((prev) => {return { ...prev, [item.label]: url };});
  //           setUploaded((prev) => prev + 1);
  //         })
  //       }).catch((e)=>{
  //         console.log(e=>console.log(`Error came in uploadBytes ${e.message}`))
  //       })
  //   });
  // }

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   console.log(movie);
  //   upload([
  //     // { file: trailer, label: "trailer" },
  //     { file: video, label: "video" },
  //   ]);
  // };

  // const getVideoUrl = url =>`https://www.googleapis.com/drive/v3/files/${getId(url)}?alt=media&key=AIzaSyBs4KA9w_9zjT6fMht4zuvuEtflz0Knoyg`

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(movie)
    createMovie(movie, dispatch);
    navigate("/movies");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="text"
            id="img"
            name="img"
            // onChange={handleChange}
            onChange={(e) =>
              setMovie({ ...movie, img: e.target.value})
            }
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
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
            onChange={(e) =>
              setMovie({ ...movie, genre: e.map((ev) => ev.value) })
            }
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="Limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>is Series?</label>
          <select id="isSeries" name="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="text"
            name="trailer"
            // onChange={(e) => setTrailer(e.target.files[0])}
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="text"
            name="video"
            onChange={(e) => setMovie({ ...movie, video: e.target.value })}
            // onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {/* {uploaded === 1 ? ( */}
        <button className="addProductButton" onClickCapture={handleSubmit}>
          Create
        </button>
        {/* ) : (  */}
        {/* <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}  */}
      </form>
    </div>
  );
}
