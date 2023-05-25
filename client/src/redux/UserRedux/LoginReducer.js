const initialState = {
    user:JSON.parse(localStorage.getItem('user'))|| null,
    isFetching:false,
    isError:false
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                ...state,
                isFetching:true
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                isError: false
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                isError: true
            }
        case "LOGOUT_SUCCESS":
            return {
                user: null,
                isFetching: false,
                isError: false
            }
        default:
            return state
    }
}

export default UserReducer