import React from 'react'
import { Avatar, Icon, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import TransactionsPage from '../../containers/TransactionsPage'
import Value from '../Value/Value'


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

    const TransactionDate = ({ date }) => {
        return (
            <ListItem className={classes.dateItem}>
                <ListItemText
                    classes={{
                        root: classes.dateItemText,
                        primary: classes.dateItemTextPrimary,
                    }}
                    primary={moment(date).format('MMMM DD, YYYY')}
                />
            </ListItem>
        )
    }

    const TransactionItem = ({ transaction }) => {
        return (
            <ListItem
                className={classes.transactionItem}
                style={{ color: transaction.category.color }}
                onClick={() => history.push(`${TransactionsPage.routeName}/${transaction._id}`)}
            >
                <ListItemAvatar>
                    <Icon style={{ color: transaction.category.color }}>
                        {transaction.category.icon}
                    </Icon>
                </ListItemAvatar>
                <ListItemText
                    primary={transaction.category.name}
                    secondary={transaction.unit}
                />
                <Value
                    value={transaction.value}
                />
            </ListItem>
        )
    }

    let performedOn
    const list = []
    
    for (let transaction of transactions) {
        if (transaction.performedOn !== performedOn) {
            performedOn = transaction.performedOn
            list.push(
                <TransactionDate
                    key={performedOn}
                    date={performedOn}
                />
            )
        }
        list.push(
            <TransactionItem
                key={transaction._id}
                transaction={transaction}
            />
        )
    }

    return (
        <Paper>
            <List className={classes.list}>
                {list}
            </List>
        </Paper>
    )
}

export default withRouter(TransactionList)