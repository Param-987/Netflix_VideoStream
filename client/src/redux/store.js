import { legacy_createStore as createStore, applyMiddleware , combineReducers} from 'redux'
import thunk from 'redux-thunk'
import ListReducer from './ListRedux/ListReducer'
import UserReducer from './UserRedux/LoginReducer'

const rootReducer = combineReducers({
    list: ListReducer,
    user:UserReducer
})


const store = createStore(rootReducer, applyMiddleware(thunk))

export default store