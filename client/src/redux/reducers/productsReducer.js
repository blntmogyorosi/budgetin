import { SET_PRODUCTS } from '../actions/actionTypes'

const initialState = {
    list: [],
    listFetched: null,
    item: {},
    itemFetched: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                list: action.payload,
                listFetched: Date.now,
            }
        default:
            return state
    }
}