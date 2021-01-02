import axios from 'axios'

import { setErrors } from './errorsAction'
import { SET_PRODUCTS } from './actionTypes'


export const fetchProducts = () => dispatch => {
    axios
        .get('/api/products')
        .then(res => {
            dispatch({
                type: SET_PRODUCTS,
                payload: res.data,
            })
        }
        )
        .catch(err => dispatch(setErrors(err.response.data)))
}