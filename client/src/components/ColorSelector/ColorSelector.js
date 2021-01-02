import React from 'react'
import { makeStyles, TextField } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    color: {

    },
    colorBox: {
        display: 'block',
        width: '100%',
        height: theme.spacing(6),
        borderRadius: theme.spacing(1),
        cursor: 'pointer',
    },
    colorInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: theme.spacing(6),
        opacity: 0,
        pointerEvents: 'none',
    }
}))

const ColorSelector = ({ id, name, value, onChange }) => {
    const classes = useStyles()

    return (
        <div className={classes.color}>
            <label htmlFor={id}>
                <div className={classes.colorBox} style={{ backgroundColor: value }} />
                <TextField
                    type="color"
                    className={classes.colorInput}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    )
}

export default ColorSelector