import { REMOVE_MESSAGE, APPEND_MESSAGE, RESET_MESSAGES } from './actionTypes'


export const appendMessage = message => dispatch => {
    dispatch({
        type: APPEND_MESSAGE,
        payload: message,
    })
}

export const removeMessage = index => dispatch => {
    dispatch({
        type: REMOVE_MESSAGE,
        payload: index,
    })
}

export const resetMessages = () => dispatch => {
    dispatch({
        type: RESET_MESSAGES,
    })
}