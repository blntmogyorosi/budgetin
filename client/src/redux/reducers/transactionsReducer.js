import { SET_TRANSACTIONS, SET_TRANSACTION } from '../actions/actionTypes'


const initialState = {
    dictionary: {},
    dictionaryFetched: null,
    item: {},
    itemFetched: null,
}

export default function (state = initialState, action) {
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
        default:
            return state
    }
}