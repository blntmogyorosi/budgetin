import moment from 'moment'

import { SET_TRANSACTIONS, SET_TRANSACTION, DELETE_TRANSACTION, INSERT_TRANSACTION, UPDATE_TRANSACTION } from '../actions/actionTypes'


const initialState = {
    dictionary: {},
    dictionaryFetched: null,
    item: {},
    itemFetched: null,
}

export default function (state = initialState, action) {
    let dictionary
    let date
    if (action.payload) {
        date = moment(action.payload.performedOn).format('YYYY-MM')
    }
    switch (action.type) {
        case SET_TRANSACTIONS:
            return {
                ...state,
                dictionary: action.payload,
                dictionaryFetched: Date.now,
            }
        case SET_TRANSACTION:
            return {
                ...state,
                item: action.payload,
                itemFetched: Date.now,
            }
        case INSERT_TRANSACTION:
            dictionary = { ...state.dictionary }
            if (Object.keys(dictionary).includes(date)) {
                dictionary[date].push(action.payload)
            } else {
                dictionary[date] = [action.payload]
            }
            return {
                ...state,
                dictionary,
            }
        case UPDATE_TRANSACTION:
            dictionary = { ...state.dictionary }
            dictionary[date] =
                dictionary[date]
                    .map(t => t._id === action.payload._id ? action.payload : t)
            return {
                ...state,
                dictionary,
            }
        case DELETE_TRANSACTION:
            dictionary = { ...state.dictionary }
            dictionary[date] = dictionary[date].filter(i => i._id !== action.payload._id)
            return {
                ...state,
                dictionary,
            }
        default:
            return state
    }
}