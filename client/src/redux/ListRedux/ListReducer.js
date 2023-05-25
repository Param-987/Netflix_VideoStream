import { FETCH_LIST_FAILURE, FETCH_LIST_START, FETCH_LIST_SUCCESS } from "./ListType";

const initialState = {
    lists:[],
    isFetching:false,
    error:false
}

const ListReducer = (state = initialState,action) =>{
    switch (action.type) {
        case FETCH_LIST_START:
            return {
                ...state,
                isFetching:true
            }
        case FETCH_LIST_SUCCESS:
            return {
                isFetching:false,
                lists:action.payload,
                error:false
            }
        case FETCH_LIST_FAILURE:
            return {
                isFetching:false,
                lists:[],
                error:true
            }
        default:
            return state
    }
}

export default ListReducer