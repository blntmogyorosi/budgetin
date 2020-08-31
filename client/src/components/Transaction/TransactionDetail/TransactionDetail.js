import React from 'react'

import { Box, BoxHeader } from '../../Box'
import Transaction from '../Transaction/Transaction'
import TransactionValue from '../TransactionValue/TransactionValue'

import './TransactionDetail.scss'


const TransactionDetail = ({ transaction }) => {
    return (
        <Box className="transaction-detail">
            <BoxHeader>
                <Transaction transaction={transaction} />
            </BoxHeader>
            <div className="transaction-product-list">
                {transaction.productList.map(p => (
                    <div key={p._id} className="transction-product">
                        <span className="product-name">{p.name}</span>
                        <TransactionValue value={p.value} />
                    </div>
                ))}
            </div>
        </Box>
    )
}

export default TransactionDetail