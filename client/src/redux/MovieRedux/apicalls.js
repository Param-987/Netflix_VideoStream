import axios from "axios"
import {  FETCH_MOVIE_FAILURE, FETCH_MOVIE_START, FETCH_MOVIE_SUCCESS} from "./MoiveAction"


export const getAllMovie = ()=>{
    return async (dispatch)=>{
        try {
            dispatch(FETCH_MOVIE_START())
            const response = await Promise.all([
                axios.get(process.env.REACT_APP_URL + '/movie',{headers: {token:"Bearer " +JSON.parse(localStorage.getItem("user")).accessToken,},}),
                axios.get(process.env.REACT_APP_URL + '/web/series',{headers: {token:"Bearer " +JSON.parse(localStorage.getItem("user")).accessToken,},}),
                axios.get(process.env.REACT_APP_URL + '/web',{headers: {token:"Bearer " +JSON.parse(localStorage.getItem("user")).accessToken,},})
            ])
            const MovieById = [...response[0].data,...response[1].data,...response[2].data]
            const Object = {}
            MovieById.forEach((item)=>{Object[item._id] = item})
            dispatch(FETCH_MOVIE_SUCCESS(Object))
        } catch (error) {
            console.log(error)
            dispatch(FETCH_MOVIE_FAILURE())
            
        }
    }
}

// export const getAllWebSeries = ()=>{
//     return async (dispatch)=>{
//         try {
//             dispatch(FETCH_WEB_START())
//             const response = await 
//             const Object = {}
//             response.data.forEach((item)=>Object[item._id]=item)
//             dispatch(FETCH_WEB_SUCCESS(Object))           
//         } catch (error) {
//             dispatch(FETCH_WEB_FAILURE())
//         }
//     }
// }