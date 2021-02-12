import React from 'react'
import { Button, Divider, Grid, makeStyles, Paper } from '@material-ui/core'
import { Create as CreateIcon, Delete as DeleteIcon } from '@material-ui/icons'

import Value from '../../Value/Value'
import Transaction from '../Transaction/Transaction'


const useStyles = makeStyles(theme => ({
    transactionActions: {
        justifyContent: 'space-evenly',
        padding: theme.spacing(2),
    },
    transactionProduct: {
        display: 'flex',
        flexFlow: 'nowrap row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    },
}))

const TransactionDetail = ({ transaction }) => {
    const classes = useStyles()

    if (!transaction) return null

    return (
        <Paper>
            <Transaction transaction={transaction} single />
            <Divider />
            <Grid container className={classes.transactionActions}>
                <Button
                    color="secondary"
                    startIcon={<CreateIcon />}
                >
                    Edit
                </Button>
                <Button
                    color="default"
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </Grid>
            <Divider />
            <div className={""}>
                {transaction.productList &&
                    transaction.productList.map(p => (
                        <div key={p.name} className={classes.transactionProduct}>
                            <span className="product-name">{p.name}</span>
                            <Value value={p.value} />
                        </div>
                    ))
                }
            </div>
        </Paper>
    )
}

export default TransactionDetail