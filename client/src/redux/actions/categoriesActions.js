import axios from 'axios'

import { setErrors } from './errorsAction'
import { SET_CATEGORIES, APPEND_CATEGORY } from './actionTypes'


export const fetchCategories = () => dispatch => {
    axios
        .get('/api/categories')
        .then(res => dispatch({
            type: SET_CATEGORIES,
            payload: res.data,
        }))
        .catch(err => dispatch(setErrors(err.response.data)))
}

export const saveCategory = category => dispatch => {
    if (category._id)
        dispatch(updateCategory(category))
    else
        dispatch(createCategory(category))
}

const createCategory = category => dispatch => {
    axios
        .post('/api/categories', category)
        .then(res => dispatch({
            type: APPEND_CATEGORY,
            payload: res.data,
        }))
        .catch(err => dispatch(setErrors(err.response.data)))
}

const updateCategory = category => dispatch => {
    axios
        .post(`/api/categories/${category._id}`, category)
        .then(category => console.log(category))
        .catch(err => dispatch(setErrors(err.response.data)))
}