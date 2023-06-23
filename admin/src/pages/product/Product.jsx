import { useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import PublishIcon from '@mui/icons-material/Publish';
import { useContext, useState } from "react";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { MoviesContext } from "../../context/movieContext/MovieContext";

export default function Product() {
    const location = useLocation();
    const {movie,_id} = location.state
    const [Movie,setMovie]  = useState({})
    const {dispatch} = useContext(MoviesContext)
    const navigate = useNavigate()

    const handleChange = (e)=>{
        setMovie({...Movie,[e.target.name]: e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        updateMovie(_id,Movie,dispatch)
        navigate('/movies')
    }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={movie.img} alt="" className="productInfoImg" />
                  <span className="productName">{movie.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{movie._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{movie.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">year:</span>
                      <span className="productInfoValue">{movie.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">limit:</span>
                      <span className="productInfoValue">{movie.limit}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Movie Title</label>
                  <input type="text" placeholder={movie.title} onChange={handleChange}  name="title"/>
                  <label>Year</label>
                  <input type="text" placeholder={movie.year} onChange={handleChange} name="year"/>
                  <label>Thumbnail</label>
                  <input type="text" placeholder={movie.img} onChange={handleChange} name="img"/>
                  <label>Description</label>
                  <input type="text" placeholder={movie.desc} onChange={handleChange} name="desc"/>
                  <label>Genre</label>
                  <input type="text" placeholder={movie.genre} onChange={handleChange} name="genre"/>
                  <label>Limit</label>
                  <input type="text" placeholder={movie.limit} onChange={handleChange} name="limit"/>
                  <label>Video</label>
                  <input type="text" placeholder={movie.video} onChange={handleChange} name="video"/>
                  <label>Type</label>
                  <select defaultValue={movie.isSeries.toString()} onChange={handleChange} name="isSeries">
                    <option value="true" >true</option>
                    <option value="false">false</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={movie.img} alt="" className="productUploadImg" />
                      <label htmlFor="file">
                          <PublishIcon/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton" onClick={handleSubmit}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
