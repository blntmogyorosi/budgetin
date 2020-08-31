import { SET_UNITS, APPEND_UNIT } from '../actions/actionTypes'

const initialState = {
    list: [],
    listFetched: null,
    item: {},
    itemFetched: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_UNITS:
            return {
                ...state,
                list: action.payload,
                listFetched: Date.now,
            }
        case APPEND_UNIT:
            return {
                ...state,
                list: [...state.list, action.payload],
            }
        default:
            return state
    }
}