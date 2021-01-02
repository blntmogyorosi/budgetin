import React from 'react'
import { AttachMoney as AttachMoneyIcon, MoneyOff as MoneyOffIcon } from '@material-ui/icons'
import { Icon, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    category: {
        flex: 1,
        display: 'flex',
        flexFlow: 'nowrap column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    categoryIcon: {
        fontSize: theme.spacing(8),
    },
    categoryName: {
        fontSize: theme.spacing(2),
    },
}))

const Category = ({ category }) => {
    const classes = useStyles()

    return (
        <div className={classes.category} style={{ color: category.color }}>
            <Icon className={classes.categoryIcon}>{category.icon}</Icon>
            <div className={classes.categoryName}>{category.name}</div>
        </div>
    )
}

export default Category