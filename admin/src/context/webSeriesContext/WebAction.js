// Post A new WebSeries List
export const POST_START = () => ({ type: "POST_START" })
export const POST_SUCCESS = (data) => ({ type: "POST_SUCCESS", payload: data })
export const POST_FAILURE = () => ({ type: "POST_FAILURE" })

// Get All List
export const getWebStart = () => ({ type: "GET_LISTS_START" })
export const getWebSuccess = (lists) => ({ type: "GET_LISTS_SUCCESS", payload: lists })
export const getWebFailure = () => ({ type: "GET_LISTS_FAILURE" })

// Get Movies whose isSeries is true, as it create WebSeriesList
export const getSeriesStart = () => ({ type: "GET_SERIES_START" })
export const getSeriesSuccess = (lists) => ({ type: "GET_SERIES_SUCCESS", payload: lists })
export const getSeriesFailure = () => ({ type: "GET_SERIES_FAILURE" })

// Add new season
export const ADD_SEASON_START = () => ({ type: "ADD_SEASON_START" })
export const ADD_SEASON_SUCCESS = (lists) => ({ type: "ADD_SEASON_SUCCESS", payload: lists })
export const ADD_SEASON_FAILURE = () => ({ type: "ADD_SEASON_FAILURE" })

// delete
export const deleteListStart = () => ({type: "DELETE_LIST_START"})
export const deleteListSuccess = (id) => ({type: "DELETE_LIST_SUCCESS",payload: id})
export const deleteListFailure = () => ({type: "DELETE_LIST_FAILURE"})

// update
export const updateListStart = () => ({type:"UPDATE_LIST_START"})
export const updateListSuccess = (list) => ({type:"UPDATE_LIST_SUCCESS",payload:list})
export const updateListFailure = () => ({type:"UPDATE_LIST_FAILURE"})

