import moment from 'moment'

import { SET_TRANSACTIONS, SET_TRANSACTION, DELETE_TRANSACTION, INSERT_TRANSACTION } from '../actions/actionTypes'


const initialState = {
    dictionary: {},
    dictionaryFetched: null,
    item: {},
    itemFetched: null,
}

export default function (state = initialState, action) {
    let dictionary
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
            dictionary[moment(action.payload.performedOn).format('YYYY-MM')].push(action.payload)
            console.log(action.payload)
            return {
                ...state,
                dictionary,
            }
        case DELETE_TRANSACTION:
            dictionary = { ...state.dictionary }
            dictionary[moment(action.payload.performedOn).format('YYYY-MM')] = dictionary[moment(action.payload.performedOn).format('YYYY-MM')].filter(i => i._id !== action.payload._id)
            return {
                ...state,
                dictionary,
            }
        default:
            return state
    }
}