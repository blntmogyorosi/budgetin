import React from 'react'
import { Button, Divider, makeStyles, Paper } from '@material-ui/core'
import { Create as CreateIcon, Delete as DeleteIcon } from '@material-ui/icons'

import TransactionList from '../../Transaction/TransactionList/TransactionList'
import ButtonContainer from '../../ButtonContainer/ButtonContainer'
import Category from '../Category/Category'
import BalanceBlock from '../../MonthSelector/BalanceBlock'


const useStyles = makeStyles(theme => ({
    categoryHeader: {
        marginBottom: theme.spacing(2),
    },
    categoryHeaderInfo: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    categoryHeaderBalance: {
        marginLeft: theme.spacing(1),
    },
}))

const CategoryDetail = ({ category, transactions }) => {
    const classes = useStyles()

    if (!category) return null

    return (
        <React.Fragment>
            <Paper className={classes.categoryHeader}>
                <div className={classes.categoryHeaderInfo}>
                    <Category
                        category={category}
                    />
                    <BalanceBlock
                        expense={-100}
                        income={214}
                    />
                </div>
                <Divider />
                <ButtonContainer>
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
                </ButtonContainer>
            </Paper>
            <TransactionList transactions={transactions} />
        </React.Fragment >
    )
}

export default CategoryDetail