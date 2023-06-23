
export const fetchListStart = ()=> ({type:FETCH_LIST_START})
export const fetchListSuccess = (data)=> ({type:FETCH_LIST_SUCCESS , payload:data})
export const fetchListFailure= ()=> ({type:FETCH_LIST_FAILURE})

export const FETCH_LIST_START = "FETCH_LIST_START"
export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS"
export const FETCH_LIST_FAILURE = "FETCH_LIST_FAILURE"