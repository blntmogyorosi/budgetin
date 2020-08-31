import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { SET_CURRENT_USER } from './actionTypes'
import { setAuthToken } from '../../utils/token'
import { appendMessage } from './messagesActions'
import { setErrors } from './errorsAction'


export const registerUser = (data, callback) => dispatch => {
    axios
        .post('/api/users/register', data)
        .then(res => {
            dispatch(appendMessage({
                type: 'success',
                text: 'You registered successfully! Now you can log in with the provided credentials!',
            }))
            if (callback) callback()
        })
        .catch(err => dispatch(setErrors(err.response.data)))
}

export const loginUser = (data, callback) => dispatch => {
    axios
        .post('/api/users/login', data)
        .then(res => {
            const token = res.data
            localStorage.setItem('jwt', token)
            setAuthToken(token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded))
            dispatch({
                type: SET_CURRENT_USER,
                payload: res.data,
            })
            if (callback) callback()
        })
        .catch(err => dispatch(setErrors(err.response.data)))
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwt')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}