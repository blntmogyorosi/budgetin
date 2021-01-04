import React from 'react'
import { makeStyles } from '@material-ui/core'

import Value from '../Value/Value'


const useStyles = makeStyles(theme => ({
    balanceBlock: {
        flex: 1,
        padding: `0 ${theme.spacing(1)}px`,
        [theme.breakpoints.up('md')]: {
            padding: `0 ${theme.spacing(2.5)}px`,
        },
    },
    balanceTitle: {
        marginBottom: theme.spacing(1),
        color: theme.palette.grey[900],
        fontWeight: 700,
        textAlign: 'center',
        fontSize: theme.spacing(1.75),
        [theme.breakpoints.up('md')]: {
            fontSize: theme.spacing(3),
        },
    },
    balanceRecord: {
        display: 'flex',
        flexFlow: 'nowrap row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing(0.5),
        color: theme.palette.grey[500],
        fontSize: theme.spacing(1.25),
        fontWeight: 400,
        [theme.breakpoints.up('md')]: {
            fontSize: theme.spacing(2),
        },
    },
}))

const BalanceBlock = ({ income, expense, title }) => {
    const classes = useStyles()

    return (
        <div className={classes.balanceBlock}>
            <div className={classes.balanceTitle}>
                {title}
            </div>
            <div className={classes.balanceRecord}>
                <span>Income</span>
                <Value
                    value={income}
                />
            </div>
            <div className={classes.balanceRecord}>
                <span>Expense</span>
                <Value
                    value={expense}
                />
            </div>
            <div className={classes.balanceRecord}>
                <span>Balance</span>
                <Value
                    value={income + expense}
                />
            </div>
        </div>
    )
}

export default BalanceBlock