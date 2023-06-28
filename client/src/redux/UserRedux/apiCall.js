import { LogOutStart, loginFailure, loginStart, loginSuccess } from "./LoginAction"
import axios from 'axios'

export const login = (user) => {
    return async (dispatch) => {
        try {
            dispatch(loginStart());
            const response = await axios
                .post("https://netflixbackend-mhrz.onrender.com/api/auth/login", user)
                console.log(response)
                dispatch(loginSuccess(response.data));
        } catch (error) {
            console.log(error)
            dispatch(loginFailure());
        }
    };
}

export const register = (user) => {
    return async (dispatch) => {
        dispatch(loginStart())
        try {
            await axios.post("https://netflixbackend-mhrz.onrender.com/api/auth/register", user)
                .then((res) => dispatch(loginSuccess(res.data)))
        } catch (error) { 
            console.log(error)
            dispatch(loginFailure()) 
        }
    }
}

export const handleGoogleLogin = () => {
    return async (dispatch) => {
        dispatch(loginStart())
        try {
            const data = await axios.get("https://netflixbackend-mhrz.onrender.com/auth/login/success", {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
            if (data.status === 200) dispatch(loginSuccess(data.data))
        } catch (error) {
            dispatch(loginFailure())
        }
    }
}

export const logout = () => {
    return dispatch =>
        dispatch(LogOutStart())
}