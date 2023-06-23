export const fetchMovieStart = "FETCH_MOVIE_START"
export const fetchMovieSuccess = "FETCH_MOVIE_SUCCESS"
export const fetchMovieFailure = "FETCH_MOVIE_FAILURE"

// export const fetchWebStart = "FETCH_MOVIE_START"
// export const fetchWebSuccess = "FETCH_MOVIE_SUCCESS"
// export const fetchWebFailure = "FETCH_MOVIE_FAILURE"


export const FETCH_MOVIE_START = () => ({type:fetchMovieStart})
export const FETCH_MOVIE_SUCCESS= (data) => ({type:fetchMovieSuccess,payload:data})
export const FETCH_MOVIE_FAILURE = () => ({type:fetchMovieFailure})

// export const FETCH_WEB_START = () => ({type:fetchWebStart})
// export const FETCH_WEB_SUCCESS= (data) => ({type:fetchWebSuccess,payload:data})
// export const FETCH_WEB_FAILURE = () => ({type:fetchWebFailure})

