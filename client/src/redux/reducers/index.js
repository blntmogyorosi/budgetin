import { combineReducers } from 'redux'

import authReducer from './authReducer'
import categoriesReducer from './categoriesReducer'
import errorsReducer from './errorsReducer'
import messagesReducer from './messagesReducer'
import productsReducer from './productsReducer'
import transactionsReducer from './transactionsReducer'
import unitsReducer from './unitsReducer'


export default combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
    errors: errorsReducer,
    messages: messagesReducer,
    products: productsReducer,
    transactions: transactionsReducer,
    units: unitsReducer,
})