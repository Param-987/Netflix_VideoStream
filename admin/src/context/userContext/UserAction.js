// get User
export const getUserStart = () => ({ type: "GET_USER_START" })
export const getUserSuccess = (data) => ({ type: "GET_USER_SUCCESS", payload: data })
export const getUSerFailure = () => ({ type: "GET_USER_FAILURE" })

// Update User
export const updateUserStart = () => ({ type: "UPDATE_USER_START" })
export const updateUserSuccess = (data) => ({ type: "UPDATE_USER_SUCCESS" , payload:data})
export const updateUserFailure = () => ({  type: "UPDATE_USER_FAILURE" })

// delete User
export const deleteUserStart = () => ({ type:"DELETE_USER_START" })
export const deleteUserSuccess = (_id) => ({ type:"DELETE_USER_SUCCESS" , payload:_id })
export const deleteUserFailure = () => ({ type:"DELETE_USER_FAILURE" })