const UserReducer = (state, action) => {
    switch (action.type) {
        case "GET_USER_START":
            return {
                userList:[],
                isFetching:true,
                isError:false
            }
        case "GET_USER_SUCCESS":
            return {
                userList:action.payload,
                isFetching:false,
                isError:false
            }
        case "GET_USER_FAILURE":
            return {
                userList:[],
                isFetching:false,
                isError:true
            }
        case "UPDATE_USER_START":
            return {
                ...state, 
                isFetching: false, 
                isError: false
            }
        case "UPDATE_USER_SUCCESS":
            return {
                userList: state.userList.map((user)=> action.payload._id === user._id ? action.payload : user), 
                isFetching: false, 
                isError: false
            }   
        case "UPDATE_USER_FAILURE":
            return {
                ...state, 
                isFetching: false, 
                isError: true
            }
        case "DELETE_USER_START":
            return {
                ...state, 
                isFetching: false, 
                isError: false
            }
        case "DELETE_USER_SUCCESS":
            return {
                userList: state.userList.filter((user) => user._id !== action.payload), 
                isFetching: false, 
                isError: false
            }
        case "DELETE_USER_FAILURE":
            return {
                ...state, 
                isFetching: false, 
                isError: true
            }
            default:
                return{...state};
    }



}

export default UserReducer