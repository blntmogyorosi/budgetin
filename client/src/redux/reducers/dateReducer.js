import moment from 'moment'
import { NEXT_MONTH, PREVIOUS_MONTH, SET_MONTH } from '../actions/actionTypes'


const initialState = {
    month: moment().format("MM"),
    year: moment().format("YYYY"),
}

export default function (state = initialState, action) {
    let date = moment(`${state.year}-${state.month}`, "YYYY-MM")
    switch (action.type) {
        case SET_MONTH:
            return {
                ...state,
                month: action.payload.month,
                year: action.payload.year,
            }
        case PREVIOUS_MONTH:
            date = date.subtract(1, 'months'); break
        case NEXT_MONTH:
            date = date.add(1, 'months'); break
        default:
            return state
    }
    return {
        ...state,
        month: date.format("MM"),
        year: date.format("YYYY"),
    }
}