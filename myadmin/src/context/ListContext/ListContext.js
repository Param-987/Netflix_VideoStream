import React, { createContext, useReducer } from 'react'
import ListReducer from './ListReducer'

const initialList = {
                lists:[],
                isFetching:true,
                isError:false
}
export const ListContext = createContext(initialList)

const ListContextProvider = ({children}) =>{
const [state,dispatch] = useReducer(ListReducer,initialList)

   return ( <ListContext.Provider value={{...state,dispatch}}>
            {children}
            </ListContext.Provider>
   );
}

export default ListContextProvider