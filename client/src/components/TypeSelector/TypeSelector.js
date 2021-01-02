import React from 'react'
import { AttachMoney as AttachMoneyIcon, MoneyOff as MoneyOffIcon } from '@material-ui/icons'
import { Input, makeStyles, Typography } from '@material-ui/core'
import Type from './Type'


const useStyles = makeStyles(theme => ({
    typeSelector: {
        display: 'flex',
        flexFlow: 'row nowrap',
        width: '100%',
        border: '1px solid transparent',
        borderColor: theme.palette.primary.main,
        borderRadius: theme.spacing(0.5),
        boxShadow: theme.shadows[2],
        color: theme.palette.primary.main,
    },
}))

const TypeSelector = ({ value, onChange, name, idPrefix }) => {
    const classes = useStyles()

    return (
        <div className={classes.typeSelector}>
            <Type
                id={`${idPrefix}_INCOME`}
                value="INCOME"
                label="Income"
                name={name}
                selectedValue={value}
                onChange={onChange}
                icon={AttachMoneyIcon}
            />
            <Type
                id={`${idPrefix}_EXPENSE`}
                value="EXPENSE"
                label="Expense"
                name={name}
                selectedValue={value}
                onChange={onChange}
                icon={MoneyOffIcon}
            />
        </div>
    )
}

export default TypeSelector