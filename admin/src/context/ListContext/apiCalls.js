import axios from "axios";

import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess } from "./ListAction";

export const getLists = async (dispatch) =>{
    dispatch(getListsStart())
    try {
        const res = await axios.get(process.env.REACT_APP_URL + 'list/',{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(getListsSuccess(res.data))
    } catch (error) {
        dispatch(getListsFailure())
    }
}

// delete
export const deleteList = async (id,dispatch) =>{
    dispatch(deleteListStart())
    try {
            await axios.delete(`${process.env.REACT_APP_URL}list/${id}`,{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(deleteListSuccess(id))
    } catch (error) {
        dispatch(deleteListFailure())
    }
}

// Create
export const createList = async (list,dispatch) =>{
    dispatch(createListStart())
    try {
            const res = await axios.post(`${process.env.REACT_APP_URL}list/`,list,{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(createListSuccess(res.data))
    } catch (error) {
        dispatch(createListFailure())
    }
}
 