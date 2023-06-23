
import { fetchMovieFailure, fetchMovieStart, fetchMovieSuccess, fetchWebFailure, fetchWebStart, fetchWebSuccess } from "./MoiveAction";

const InitialState = {
    MovieById: {},
    Isfetching: true,
    Iserror: false
}

const MovieReducer = (state = InitialState, action) => {
    switch (action.type) {
        case fetchMovieStart:
            return {
                ...state,
                MovieById: {},
                Isfetching: true,
                Iserror: false,
            }
        case fetchMovieSuccess:
            return {
                ...state,
                MovieById: action.payload,
                Isfetching: false,
                Iserror: false,
            }
        case fetchMovieFailure:
            return {
                ...state,
                MovieById: {},
                Isfetching: true,
                Iserror: false,
            }
        // case fetchWebStart:
        //     return {
        //         ...state,
        //         WebList: {},
        //         Isfetching: true,
        //         isError: false
        //     }
        // case fetchWebSuccess:
        //     return {
        //         ...state,
        //         WebList: action.payload,
        //         Isfetching: false,
        //         isError: false
        //     }
        // case fetchWebFailure:
        //     return {
        //         ...state,
        //         WebList: {},
        //         Isfetching: true,
        //         isError: true
        //     }
        default:
            return state;
    }
}
export default MovieReducer