import { combineReducers } from 'redux'

import authReducer from './authReducer'
import errorsReducer from './errorsReducer'
import messagesReducer from './messagesReducer'


export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    messages: messagesReducer
})