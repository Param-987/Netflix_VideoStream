import React, { createContext,useEffect,useReducer } from 'react'
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem('user')) || null,
    isFetching:false,
    error:false
}

export const authContext = createContext(INITIAL_STATE)


const AuthContextProvider = (props) =>{

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])

    return <authContext.Provider value={{...state,dispatch}} >
        {props.children}
    </authContext.Provider>
}

export default AuthContextProvider