import React from 'react'
import { Button, Divider, makeStyles, Paper } from '@material-ui/core'
import { Create as CreateIcon, Delete as DeleteIcon } from '@material-ui/icons'

import TransactionList from '../../Transaction/TransactionList/TransactionList'
import ButtonContainer from '../../ButtonContainer/ButtonContainer'


const useStyles = makeStyles(theme => ({

}))

const CategoryDetail = ({ category, transactions }) => {
    const classes = useStyles()

    if (!category) return null

    return (
        <React.Fragment>
            <Paper>
                <div>{category.name}</div>
                <div>
                    <div>
                        Category Balance
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
                </div>
            </Paper>
            <TransactionList transactions={transactions} />
        </React.Fragment>
    )
}

export default CategoryDetail