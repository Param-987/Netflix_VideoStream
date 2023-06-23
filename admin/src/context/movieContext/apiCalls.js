import axios from "axios";
import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./MovieAction";

export const getMovies = async (dispatch) => {
    console.log("first")
    dispatch(getMoviesStart())
    try {
        const res = await axios.get(process.env.REACT_APP_URL + 'movie', {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(getMoviesSuccess(res.data))
    } catch (error) {
        dispatch(getMoviesFailure())
    }
}

// delete
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart())
    try {
        await axios.delete(process.env.REACT_APP_URL + `movie/${id}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(deleteMovieSuccess(id))
    } catch (error) {
        dispatch(deleteMovieFailure())
    }
}

// Create
export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart())
    try {
        const res = await axios.post(process.env.REACT_APP_URL + `movie/`, movie, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(createMovieSuccess(res.data))
    } catch (error) {
        dispatch(createMovieFailure())
    }
}


// updateMovie

export const updateMovie = async (_id, body, dispatch) => {
    try {
        dispatch(updateMovieStart())
        const data = await axios.put(process.env.REACT_APP_URL + "movie/"+_id,body,{
            headers:{
                token: "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(updateMovieSuccess(data.data))
    } catch (error) {
        dispatch(updateMovieFailure());
    }
}

export const logicalSort = (a, b) => {
    const matchA = a.title.match(/S(\d+) E(\d+)/);
    const matchB = b.title.match(/S(\d+) E(\d+)/);
  
    if (matchA && matchB) {
      const [, seasonA, episodeA] = matchA;
      const [, seasonB, episodeB] = matchB;
  
      if (parseInt(seasonA) === parseInt(seasonB)) {
        return parseInt(episodeA) - parseInt(episodeB);
      }
  
      return parseInt(seasonA) - parseInt(seasonB);
    }
    return a.title.localeCompare(b.title);
};