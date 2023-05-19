import axios from "axios";
import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./MovieAction";

export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart())
    try {
        const res = await axios.get('movie', {
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
        await axios.delete(`movie/${id}`, {
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
        const res = await axios.post(`movie/`, movie, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(createMovieSuccess(res.data))
    } catch (error) {
        dispatch(createMovieFailure())
    }
}
