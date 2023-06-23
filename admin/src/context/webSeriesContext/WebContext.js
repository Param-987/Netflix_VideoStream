import {createContext , useReducer } from 'react'
import { WebSeriesReducer } from './WebReducer'
const Initial_List =  {
    seriesList:[],
    seriesMovies:[],
    isFetching:false,
    isError:false
}

export const SeriesListContext = createContext(Initial_List)

const SeriesListContextProvider = ({children})=>{

    const [state,dispatch] = useReducer(WebSeriesReducer,Initial_List)

    return <SeriesListContext.Provider value={{...state,dispatch}}>
        {children}
    </SeriesListContext.Provider>
}

export default SeriesListContextProvider
