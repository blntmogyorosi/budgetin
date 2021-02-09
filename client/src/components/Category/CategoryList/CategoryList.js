import React from 'react'
import { withRouter } from 'react-router-dom'
import { GridList, GridListTile } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import CategoriesPage from '../../../containers/CategoriesPage'
import Category from '../Category/Category'


const useStyles = makeStyles(theme => ({
    categoryList: {
        // overflowY: 'scroll',
    },
    categoryListTile: {
        height: 'min-content !important',
        padding: `${theme.spacing(2)}px !important`,
    },
}))

const CategoryList = ({ categories, history }) => {
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
                        onClick={() => history.push(`${CategoriesPage.routeName}/${category._id}`)}
                    />
                </GridListTile>
            ))}
        </GridList>
    )
}

export default withRouter(CategoryList)