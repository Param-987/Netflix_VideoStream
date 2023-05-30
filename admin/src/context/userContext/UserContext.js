import React, {createContext , useReducer } from "react";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {
    userList:[],
    isFetching:false,
    isError:false
}
export const UserContext = createContext(INITIAL_STATE)

const UserContextProvider  = (props) =>{

    const [state , dispatch] = useReducer(UserReducer,INITIAL_STATE)

    return (
        <UserContext.Provider value={{...state,dispatch}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider