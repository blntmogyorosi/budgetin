import React from 'react'
import { Chip, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    unit: {
        margin: theme.spacing(1),
        cursor: 'pointer',
    },
}))

const Unit = ({ unit }) => {
    const classes = useStyles()

    return (
        <Chip
            className={classes.unit}
            label={unit.name}
        />
    )
}

export default Unit