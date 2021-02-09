import React from 'react'

import Category from '../Category/Category'
import { GridList, GridListTile } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    categoryList: {
        // overflowY: 'scroll',
    },
    categoryListTile: {
        height: 'min-content !important',
        padding: `${theme.spacing(2)}px !important`,
    },
}))

const CategoryList = ({ categories }) => {
    const classes = useStyles()

    return (
        <GridList className={classes.categoryList} cols={3}>
            {categories.map(category => (
                <GridListTile
                    key={category._id}
                    className={classes.categoryListTile}
                >
                    <Category
                        category={category}
                        onClick={() => console.log(`/TransactionsPage.routeName/${category._id}`)}
                    />
                </GridListTile>
            ))}
        </GridList>
    )
}

export default CategoryList