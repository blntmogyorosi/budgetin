import React from 'react'

import './TransactionValue.scss'


const TransactionValue = ({ value }) => {
    return (
        <div className="transaction-value">
            <span style={{ color: value > 0 ? 'darkgreen' : 'darkred' }}>{value}</span>
        </div>
    )
}

export default TransactionValue