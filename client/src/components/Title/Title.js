import React from 'react'
import { Button, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    title: {
        display: 'flex',
        flexFlow: 'nowrap row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        marginBottom: theme.spacing(2),
        '& > h1, & > h2, & > h3, & > h4, & > h5, & > h6': {
            padding: 0,
            margin: 0,
        },
    },
}))

const Title = ({ children, component: Component = 'h1', button }) => {
    const classes = useStyles()

    return (
        <div className={classes.title}>
            <Component>
                {children}
            </Component>
            {button &&
                <Button {...button} />
            }
        </div>
    )
}

export default Title