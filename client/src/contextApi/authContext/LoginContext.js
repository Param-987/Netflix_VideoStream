import { useEffect, useReducer} from 'react'
import React from 'react'
import { LoginReducer } from './LoginReducer'


const INITIAL_STATE = {
    user : JSON.parse(localStorage.getItem("user")) || null,
    isFetching:false,
    isError:false
}

export const AuthContext = React.createContext(INITIAL_STATE)

const AuthContextProvider = (props)=>{

    const [state,dispatch] = useReducer(LoginReducer,INITIAL_STATE)

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider