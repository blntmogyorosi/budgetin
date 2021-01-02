import React from 'react'
import { IconButton, makeStyles, Paper } from '@material-ui/core'
import { ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon } from '@material-ui/icons'


const useStyles = makeStyles(theme => ({
    monthSelector: {
        display: 'flex',
        flexFlow: 'nowrap row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: theme.spacing(4),
    },
    balance: {
        flex: 1,
        display: 'flex',
        flexFlow: 'nowrap row',
    },
    balanceBlock: {
        flex: 1,
    },
}))

const MonthSelector = ({ month, year, monthlyExpense, monthlyIncome, totalExpense, totalIncome, previousMonth, nextMonth }) => {
    const classes = useStyles()
    return (
        <Paper className={classes.monthSelector}>
            <IconButton onClick={previousMonth}>
                <ArrowLeftIcon />
            </IconButton>
            <div className={classes.balance}>
                <div className={classes.balanceBlock}>
                    <div className="">
                        {month} - {year}
                    </div>
                    <div className="">
                        Expense: {monthlyExpense}
                    </div>
                    <div className="">
                        Income: {monthlyIncome}
                    </div>
                    <div className="">
                        {monthlyIncome + monthlyExpense}
                    </div>
                </div>
                <div className={classes.balanceBlock}>
                    <div className="">
                        All Time
                    </div>
                    <div className="">
                        Expense: {totalExpense}
                    </div>
                    <div className="">
                        Income: {totalIncome}
                    </div>
                    <div className="">
                        {totalIncome - totalExpense}
                    </div>
                </div>
            </div>
            <IconButton onClick={nextMonth}>
                <ArrowRightIcon />
            </IconButton>
        </Paper>
    )
}

export default MonthSelector