import axios from "axios";
import { fetchListFailure, fetchListStart, fetchListSuccess } from "./ListAction"


export const fetchList = (type, genre) => {
    const url = `https://netflixbackend-mhrz.onrender.com/api/list${type ? '?type=' + type : "" }${genre ? "?genre=" + genre : ""}`
    return async (dispatch)=>{
        dispatch(fetchListStart());
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        token:
                            "Bearer " +
                            JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                })
            dispatch(fetchListSuccess(response.data))
        } catch (error) {
            dispatch(fetchListFailure())
        }
    }
}