import React from 'react'
import { withRouter } from 'react-router-dom'

import { Box, BoxHeader, BoxFooter } from '../../Box'
import TransactionsPage from '../../../containers/TransactionsPage'
import Transaction from '../Transaction/Transaction'
import TransactionValue from '../TransactionValue/TransactionValue'

import './TransactionList.scss'


const TransactionList = ({ transactions, isWidget, history }) => {
    return (
        <div className="transaction-list-container">
            <div className="transaction-list">
                {transactions && Object.keys(transactions).length > 0 ?
                    Object.entries(transactions).map(([day, dayTransactions]) => (
                        <Box key={day} className="transaction-day">
                            <BoxHeader className="transaction-day-date">
                                {day}
                            </BoxHeader>
                            <div className="transaction-day-list">
                                {dayTransactions.map(transaction => (
                                    <Transaction key={transaction._id} transaction={transaction} onClick={() => history.push(`${TransactionsPage.routeName}/${transaction._id}`)} />
                                ))}
                            </div>
                            <BoxFooter>
                                <TransactionValue value={dayTransactions.reduce((sum, t) => sum + t.value, 0)} />
                            </BoxFooter>
                        </Box>
                    ))
                    :
                    <div>No transactions have been added yet!</div>
                }
            </div>
            {/* {isWidget && <NavLink to={TransactionsPage.routeName}>See all</NavLink>} */}
        </div>
    )
}

export default withRouter(TransactionList)