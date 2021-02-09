import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { List, ListItem, ListItemText, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import TransactionsPage from '../../../containers/TransactionsPage'
import Transaction from '../../Transaction/Transaction/Transaction'
import Value from '../../Value/Value'


const useStyles = makeStyles(theme => ({
    list: {
        padding: 0,
    },
    dateItem: {
        padding: theme.spacing(1),
        backgroundColor: '#EFEFEF',
        color: '#575757',
    },
    dateItemText: {
        margin: 0,
    },
    dateItemTextPrimary: {
        fontSize: theme.spacing(1.5),
        fontWeight: 700,
    },
    transactionItem: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, .05)',
        },
    },
}))

const TransactionList = ({ transactions, history }) => {
    const classes = useStyles()

    const TransactionDate = ({ date, value }) => {
        return (
            <ListItem className={classes.dateItem}>
                <ListItemText
                    classes={{
                        root: classes.dateItemText,
                        primary: classes.dateItemTextPrimary,
                    }}
                    primary={moment(date).format('MMMM DD, YYYY')}
                />
                <Value value={value} />
            </ListItem>
        )
    }

    const createDateBlock = (performedOn, value, tempList, list) => {
        list.push(
            <TransactionDate
                key={performedOn}
                date={performedOn}
                value={value}
            />
        )
        list.push(...tempList)
        return list
    }

    let performedOn
    let tempValue
    let tempList = []
    let list = []

    for (let transaction of transactions) {
        if (transaction.performedOn !== performedOn) {
            if (performedOn) {
                list = createDateBlock(performedOn, tempValue, tempList, list)
            }
            performedOn = transaction.performedOn
            tempList = []
            tempValue = 0
        }
        tempList.push(
            <Transaction
                key={transaction._id}
                transaction={transaction}
                onClick={() => history.push(`${TransactionsPage.routeName}/${transaction._id}`)}
            />
        )
        tempValue += transaction.value
    }
    // Add the last date block
    createDateBlock(performedOn, tempValue, tempList, list)

    return (
        <Paper>
            <List className={classes.list}>
                {list}
            </List>
        </Paper>
    )
}

export default withRouter(TransactionList)