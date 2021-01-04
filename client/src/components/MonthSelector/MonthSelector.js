import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Icon, IconButton, makeStyles, Paper } from '@material-ui/core'

import BalanceBlock from './BalanceBlock'
import { previousMonth, nextMonth } from '../../redux/actions/dateActions'


const useStyles = makeStyles(theme => ({
    monthSelector: {
        display: 'flex',
        flexFlow: 'nowrap row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: `${theme.spacing(2)}px 0`,
        marginBottom: theme.spacing(4),
    },
    arrow: {
        padding: 0,
        '& span': {
            fontSize: theme.spacing(4),
        },
    },
    balance: {
        flex: 1,
        display: 'flex',
        flexFlow: 'nowrap row',
    },
}))

const MonthSelector = ({ date, transactions, previousMonth, nextMonth, }) => {
    const classes = useStyles()

    const monthlyTransactions = transactions.dictionary[`${date.year}-${date.month}`] || []
    const allTransactions = Object.values(transactions.dictionary).reduce((all, month) => ([...all, ...month]), [])

    return (
        <Paper className={classes.monthSelector}>
            <IconButton onClick={previousMonth} className={classes.arrow}>
                <Icon>arrow_left</Icon>
            </IconButton>
            <div className={classes.balance}>
                <BalanceBlock
                    title={moment(`${date.year}-${date.month}`).format("MMMM, YYYY")}
                    income={
                        monthlyTransactions.reduce((sum, t) => {
                            if (t.category.type === "INCOME") return sum + t.value
                            else return sum
                        }, 0)
                    }
                    expense={
                        monthlyTransactions.reduce((sum, t) => {
                            if (t.category.type === "EXPENSE") return sum + t.value
                            else return sum
                        }, 0)
                    }
                />
                <BalanceBlock
                    title="All Time"
                    income={
                        allTransactions.reduce((sum, t) => {
                            if (t.category.type === "INCOME") return sum + t.value
                            else return sum
                        }, 0)
                    }
                    expense={
                        allTransactions.reduce((sum, t) => {
                            if (t.category.type === "EXPENSE") return sum + t.value
                            else return sum
                        }, 0)
                    }
                />
            </div>
            <IconButton onClick={nextMonth} className={classes.arrow}>
                <Icon>arrow_right</Icon>
            </IconButton>
        </Paper>
    )
}

const mapStateToProps = state => ({
    date: state.date,
    transactions: state.transactions,
})

export default connect(mapStateToProps, { previousMonth, nextMonth })(MonthSelector)