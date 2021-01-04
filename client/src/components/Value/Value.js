import React from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    value: {
        flex: '0 1 auto',
        fontFamily: 'Roboto Mono, monospace',
        fontWeight: 700,
        textAlign: 'right',
    }
}))

const Value = ({ value }) => {
    const classes = useStyles()

    return (
        <div className={classes.value}>
            <span style={{ color: value >= 0 ? 'darkgreen' : 'darkred' }}>
                {value}
            </span>
        </div>
    )
}

export default Value