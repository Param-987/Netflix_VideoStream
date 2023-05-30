import React, { createContext, useReducer } from 'react'
import MovieReducer from './MovieReducer'

const initialMovies = {
                movies:[],
                isFetching:true,
                isError:false
}
export const MoviesContext = createContext(initialMovies)

const MovieContextProvider = ({children}) =>{
const [state,dispatch] = useReducer(MovieReducer,initialMovies)

   return ( <MoviesContext.Provider value={{...state,dispatch}}>
            {children}
            </MoviesContext.Provider>
   );
}

export default MovieContextProvider