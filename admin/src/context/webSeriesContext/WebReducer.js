export const WebSeriesReducer = (state, action) => {
    switch (action.type) {
        case "POST_START":
            return {
                isFetching: false,
                ...state,
                isError: false
            }
        case "POST_SUCCESS":
            return {
                isFetching: false,
                ...state,
                seriesList:[...state.seriesList,action.payload],
                seriesMovies:state.seriesMovies,
                isError: false
            }
        case "POST_FAILURE":
            return {
                isFetching: false,
                ...state,
                isError: false
            }
        case "GET_LISTS_START":
            return {
                ...state,
                seriesList: [],
                isFetching: true,
                isError: false
            }

        case "GET_LISTS_SUCCESS":
            return {
                ...state,
                seriesList: action.payload,
                isFetching: false,
                isError: false
            }

        case "GET_LIST_FAILURE":
            return {
                seriesList: [],
                ...state,
                isFetching: false,
                isError: true
            }
        case "GET_SERIES_START":
            return {
                ...state,
                seriesMovies:[],
                isFetching: true,
                isError: false
            }

        case "GET_SERIES_SUCCESS":
            return {
                ...state,
                seriesMovies:action.payload,
                isFetching: false,
                isError: false
            }

        case "GET_SERIES_FAILURE":
            return {
                ...state,
                seriesList: [],
                isFetching: false,
                isError: true
            }
        case "ADD_SEASON_START":
            return {
                ...state,
                isFetching: true,
                isError: false
            }
        case "ADD_SEASON_SUCCESS":
            return {
                seriesList: state.seriesList.map((item) => item._id === action.payload._id ? action.payload : item),
                isFetching: false,
                isError: false
            }

        case "ADD_SEASON_FAILURE":
            return {
                ...state,
                isFetching: false,
                isError: true
            }
        default:
            return state;
    }
}