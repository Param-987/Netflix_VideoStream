import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
export const login = async (user,dispatch) =>{
    dispatch(loginStart())
    try {
        const res = await axios.post(process.env.REACT_APP_URL + 'auth/login',user)
        console.log(await res.data)
        res.data.isAdmin && dispatch(loginSuccess(res.data))
        
    } catch (error) {
        dispatch(loginFailure())
    }
}