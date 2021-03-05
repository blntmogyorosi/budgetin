import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { Create as CreateIcon, Delete as DeleteIcon } from '@material-ui/icons'

import Value from '../../Value/Value'
import Transaction from '../Transaction/Transaction'
import ButtonContainer from '../../ButtonContainer/ButtonContainer'
import Modal from '../../Modal/Modal'
import { deleteTransaction } from '../../../redux/actions/transactionsActions'
import { withRouter } from 'react-router-dom'
import TransactionsPage from '../../../containers/TransactionsPage'


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
    modalHeader: {
        padding: theme.spacing(4),
    },
}))


const TransactionDetail = ({ transaction, ...props }) => {
    const [isConfirmDeleteTransaction, setIsConfirmDeleteTransaction] = useState(false)
    const classes = useStyles()
    const { deleteTransaction, history } = props

    if (!transaction) return null

    const deleteTransactionCover = () => {
        deleteTransaction(transaction, () => {
            history.push(`${TransactionsPage.routeName}`)
        })
    }

    return (
        <Paper>
            <Transaction transaction={transaction} single />
            <Divider />
            <Grid container className={classes.transactionActions}>
                <Button
                    color="secondary"
                    startIcon={<CreateIcon />}
                    onClick={() => history.push(`${TransactionsPage.routeName}/${transaction._id}/edit`)}
                >
                    Edit
                </Button>
                <Button
                    color="default"
                    startIcon={<DeleteIcon />}
                    onClick={() => setIsConfirmDeleteTransaction(true)}
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
            <Modal
                open={isConfirmDeleteTransaction}
                onClose={() => setIsConfirmDeleteTransaction(false)}
            >
                <div className={classes.modalHeader}>
                    <Typography>
                        Are you sure you want to delete this transaction?
                    </Typography>
                </div>
                <ButtonContainer>
                    <Button onClick={() => setIsConfirmDeleteTransaction(false)}>
                        No
                    </Button>
                    <Button color="primary" onClick={deleteTransactionCover}>
                        Yes
                    </Button>
                </ButtonContainer>
            </Modal>
        </Paper>
    )
}

export default connect(null, { deleteTransaction })(withRouter(TransactionDetail))