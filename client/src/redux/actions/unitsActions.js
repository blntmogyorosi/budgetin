import axios from 'axios'

import { setErrors } from './errorsAction'
import { SET_UNITS, APPEND_UNIT } from './actionTypes'


export const fetchUnits = () => dispatch => {
    axios
        .get('/api/units')
        .then(res => dispatch({
            type: SET_UNITS,
            payload: res.data,
        }))
        .catch(err => dispatch(setErrors(err.response.data)))
}

export const saveUnit = (unit, callback) => dispatch => {
    if (unit._id)
        dispatch(updateUnit(unit, callback))
    else
        dispatch(createUnit(unit, callback))
}

const createUnit = (unit, callback) => dispatch => {
    axios
        .post('/api/units', unit)
        .then(res => {
            dispatch({
                type: APPEND_UNIT,
                payload: res.data,
            })
            if (callback) callback(res.data)
        })
        .catch(err => dispatch(setErrors(err.response.data)))
}

const updateUnit = (unit, callback) => dispatch => {
    axios
        .post(`/api/units/${unit._id}`, unit)
        .then(unit => console.log(unit))
        .catch(err => dispatch(setErrors(err.response.data)))
}