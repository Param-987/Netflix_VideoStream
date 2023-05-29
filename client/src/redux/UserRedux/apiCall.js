import { LogOutStart, loginFailure, loginStart, loginSuccess } from "./LoginAction"
import axios from 'axios'

export const login = (user) => {
    return async (dispatch) => {
        try {
            dispatch(loginStart());
            await axios
                .post("http://18.204.215.48:5000/api/auth/login", user)
                .then((res) => dispatch(loginSuccess(res.data)));
        } catch (error) {
            dispatch(loginFailure());
        }
    };
}

export const register = (user) => {
    return async (dispatch) => {
        dispatch(loginStart())
        try {
            await axios.post("http://18.204.215.48:5000/api/auth/register", user)
            .then((res) => dispatch(loginSuccess(res.data)))
        } catch (error) { dispatch(loginFailure()) }
    }
}

export const logout = () => {
    return dispatch =>
        dispatch(LogOutStart())
}