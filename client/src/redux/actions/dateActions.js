import { NEXT_MONTH, PREVIOUS_MONTH } from './actionTypes'

export const previousMonth = () => dispatch => {
    dispatch({
        type: PREVIOUS_MONTH,
    })
}

export const nextMonth = () => dispatch => {
    dispatch({
        type: NEXT_MONTH,
    })
}