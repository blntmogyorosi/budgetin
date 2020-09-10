import axios from 'axios'
import moment from 'moment'

import { setErrors } from './errorsAction'
import { SET_TRANSACTIONS } from './actionTypes'


export const fetchTransactions = (callback) => dispatch => {
    axios
        .get(`/api/transactions?from=${moment().startOf('month').format('YYYY-MM-DD')}&to=${moment().add(1, 'day').format('YYYY-MM-DD')}`)
        .then(res => {
            dispatch({
                type: SET_TRANSACTIONS,
                payload: res.data
            })
        })
        .catch(err => dispatch(setErrors(err.response.data)))
}

export const fetchTransaction = (_id, callback) => dispatch => {
    axios
        .get(`/api/transactions/${_id}`)
        .then(res => dispatch({
            type: 'SET_TRANSACTION',
            payload: res.data,
        }))
        .catch(err => dispatch(setErrors(err.response.data)))
}

export const saveTransaction = (transaction, callback) => dispatch => {
    if (transaction._id)
        dispatch(updateTransaction(transaction, callback))
    else
        dispatch(createTransaction(transaction, callback))
}

const createTransaction = (transaction, callback) => dispatch => {
    axios
        .post('/api/transactions', transaction)
        // .then(res => console.log(res.data))
        .then(res => callback ? callback(res.data) : undefined)
        .catch(err => dispatch(setErrors(err.response.data)))
}

const updateTransaction = (transaction, callback) => dispatch => {

}