import { ADD_SEASON_FAILURE, ADD_SEASON_START, ADD_SEASON_SUCCESS, POST_FAILURE, POST_START, POST_SUCCESS, getSeriesFailure, getSeriesStart, getSeriesSuccess, getWebFailure, getWebStart, getWebSuccess } from "./WebAction"
import axios from 'axios'

export const postSeries = async (series,dispatch) =>{
    try {
        dispatch(POST_START())
        await axios.post(`${process.env.REACT_APP_URL}web`,series,
        {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        }).then((res)=>dispatch(POST_SUCCESS(res.data)))
    } catch (error) {
        dispatch(POST_FAILURE())
    }
}

export const getWeb = async (dispatch) =>{
    dispatch(getWebStart())
    try {
        const res = await axios.get(process.env.REACT_APP_URL + 'web/',{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(getWebSuccess(res.data))
    } catch (error) {
        dispatch(getWebFailure())
    }
}

export const addSeason = async (_id,data,dispatch) =>{
    dispatch(ADD_SEASON_START())
    try {
        const res = await axios.post(process.env.REACT_APP_URL + 'web/addSeason/'+ _id,{episodes:data},{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(ADD_SEASON_SUCCESS(res.data))
    } catch (error) {
        dispatch(ADD_SEASON_FAILURE())
    }
}

export const getOnlySeries = async(dispatch)=>{
    dispatch(getSeriesStart())
    try {
        const res = await axios.get(process.env.REACT_APP_URL + 'web/series/',{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(getSeriesSuccess(res.data))
    } catch (error) {
        dispatch(getSeriesFailure())
    }
}