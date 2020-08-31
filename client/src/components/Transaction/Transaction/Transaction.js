import React from 'react'
import moment from 'moment'

import TransactionValue from '../TransactionValue/TransactionValue'

import './Transaction.scss'


const Transaction = ({ transaction, onClick }) => {
    return (
        <div className="transaction-container">
            {transaction.performedOn &&
                <div className="transction-perform-date">
                    {moment(transaction.performedOn).format("YYYY-MM-DD")}
                </div>
            }
            <div className={`transaction${onClick ? ' clickable' : ''}`} onClick={onClick}>
                <div className="transaction-icon">
                    <i className={transaction.category.icon} style={{ color: transaction.category.color }}></i>
                </div>
                <div className="transaction-info">
                    <span className="transaction-info-category" style={{ color: transaction.category.color }}>{transaction.category.name}</span>
                    <span className="transaction-info-unit">{transaction.unit.name || transaction.unit}</span>
                </div>
                <TransactionValue value={transaction.value} />
            </div>
        </div>
    )
}

export default Transaction