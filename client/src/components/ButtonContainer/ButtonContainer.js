import React from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    buttonContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
}))

const ButtonContainer = ({ children }) => {
    const classes = useStyles() 

    return (
        <div className={classes.buttonContainer}>
            {children}
        </div>
    )
}

export default ButtonContainer