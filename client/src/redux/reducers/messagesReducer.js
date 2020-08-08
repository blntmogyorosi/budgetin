import { APPEND_MESSAGE, PREPEND_MESSAGE, RESET_MESSAGES, REMOVE_MESSAGE } from '../actions/actionTypes'


const initialState = [] // item format: { type: 'enum(success|error|warning)', text: 'string' }

export default function (state = initialState, action) {
    switch (action.type) {
        case PREPEND_MESSAGE:
            return [
                action.payload,
                ...state,
            ]
        case APPEND_MESSAGE:
            return [
                ...state,
                action.payload,
            ]
        case RESET_MESSAGES:
            return []
        case REMOVE_MESSAGE:
            return [
                ...state.splice(action.payload, 1)
            ]
        default:
            return state
    }
}