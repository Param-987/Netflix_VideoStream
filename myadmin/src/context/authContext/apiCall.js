import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
export const login = async (user,dispatch) =>{
    dispatch(loginStart())
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login',user)
        console.log(await res.data)
        res.data.isAdmin && dispatch(loginSuccess(res.data))
        
    } catch (error) {
        dispatch(loginFailure())
    }
}