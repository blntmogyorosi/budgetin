import { SET_CATEGORIES, APPEND_CATEGORY } from '../actions/actionTypes'

const initialState = {
    list: [],
    listFetched: null,
    item: {},
    itemFetched: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                list: action.payload,
                listFetched: Date.now,
            }
        case APPEND_CATEGORY:
            return {
                ...state,
                list: [...state.list, action.payload],
            }
        default:
            return state
    }
}