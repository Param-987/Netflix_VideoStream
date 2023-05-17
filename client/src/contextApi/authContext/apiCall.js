import { loginFailure, loginStart, loginSuccess } from "./LoginAction"
import axios from 'axios'


export const login = async (user, dispatch) => {
    dispatch(loginStart())
    try {
        await axios.post('/auth/login', user)
            .then((res) => dispatch(loginSuccess(res.data)))
            .catch((e) => dispatch(loginFailure()))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const register = async (user, dispatch) => {
    dispatch(loginStart())
    try {
        await axios.post('/auth/register', user)
        .then((res) => dispatch(loginSuccess(res.data)))
        .catch((e)=>dispatch(loginFailure()))
    } catch (error) {
        dispatch(loginFailure())
    }
}