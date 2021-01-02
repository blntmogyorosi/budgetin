import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    type: {
        flex: 1,
        cursor: 'pointer',
    },
    typeInput: {
        position: 'absolute',
        opacity: 0,
        pointerEvents: 'none',
    },
    typeLabel: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        padding: theme.spacing(1),
        cursor: 'pointer',
    },
    selected: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
    },
}))

const Type = ({ id, value, label, name, selectedValue, onChange, icon: Icon }) => {
    const classes = useStyles()

    return (
        <div className={classes.type}>
            <input
                type="radio"
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                className={classes.typeInput}
            />
            <label htmlFor={id} className={`${classes.typeLabel}${value === selectedValue ? ` ${classes.selected}` : ''}`}>
                <Icon />
                <Typography>
                    {label}
                </Typography>
            </label>
        </div>
    )
}

export default Type