import { SET_ERRORS } from './actionTypes'

export const setErrors = errors => dispatch => {
    dispatch({
        type: SET_ERRORS,
        payload: errors,
    })
}

export const resetErrors = () => dispatch => {
    dispatch({
        type: SET_ERRORS,
        payload: {},
    })
}