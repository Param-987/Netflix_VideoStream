import { FETCH_LIST_FAILURE, FETCH_LIST_START, FETCH_LIST_SUCCESS } from "./ListType";

export const fetchListStart = ()=> ({type:FETCH_LIST_START})
export const fetchListSuccess = (data)=> ({type:FETCH_LIST_SUCCESS , payload:data})
export const fetchListFailure= ()=> ({type:FETCH_LIST_FAILURE})