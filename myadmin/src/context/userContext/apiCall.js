import { deleteUserFailure, deleteUserStart, deleteUserSuccess, getUSerFailure, getUserStart, getUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./UserAction"
import axios from 'axios'

export const getUserList = async (dispatch) =>{
    dispatch(getUserStart())
    try {
        const res = await axios.get('user',{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(getUserSuccess(res.data))
    } catch (error) {
        dispatch(getUSerFailure())
    }
}

export const deleteUser = async(_id,dispatch) =>{
    dispatch(deleteUserStart())
    try {
        await axios.delete('user/' + _id,{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(deleteUserSuccess(_id))
    } catch (error) {
        dispatch(deleteUserFailure())
    }
}

export const updateUser = async(_id,dispatch,user)=>{
    dispatch(updateUserStart())
    try {
        const res = await axios.put('http://localhost:5000/api/user/' + _id,user,{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem('user')).accessToken
            }
        })
        console.log(res.data)
        dispatch(updateUserSuccess(res.data))
        
    } catch (error) {
        dispatch(updateUserFailure())
    }

}