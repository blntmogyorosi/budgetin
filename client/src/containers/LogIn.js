import React from 'react'
import { connect } from 'react-redux'

import { loginUser } from '../redux/actions/authActions'
import { resetErrors } from '../redux/actions/errorsAction'
import { resetMessages } from '../redux/actions/messagesActions'
import { Button, Grid, Link, Paper, TextField, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'


const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '100vw',
        height: '100vh',
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row nowrap',
        },
    },
    hero: {
        flex: '1 1 auto',
        backgroundImage: 'url(/img/bg-login.jpg)',
        backgroundSize: 'cover',
        boxShadow: 'inset -16px 0 64px -16px rgba(0, 0, 0, .95)',
        order: 2,
        [theme.breakpoints.up('md')]: {
            order: 1,
        }
    },
    heroContent: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: theme.spacing(4),
        backgroundColor: 'rgba(0, 0, 0, .5)',
        color: 'white',
        textAlign: 'center',
    },
    form: {
        flex: '0 1 auto',
        padding: theme.spacing(4),
        maxWidth: '525px',
        order: 1,
        [theme.breakpoints.up('md')]: {
            order: 2,
        },
    },
    paper: {
        padding: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    title: {
        marginBottom: theme.spacing(4),
        textAlign: 'center',
    },
    textField: {
        marginBottom: theme.spacing(4),
    }
})

class LogIn extends React.Component {

    static routeName = '/login'

    constructor(props) {
        super(props)
        this.state = {
            form: {
                email: {
                    type: 'text',
                    label: 'Email',
                    value: '',
                    onChange: this.onInputChange,
                    autoComplete: 'email'
                },
                password: {
                    type: 'password',
                    label: 'Password',
                    value: '',
                    onChange: this.onInputChange,
                    autoComplete: 'password'
                },
            },
            errors: {},
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (Object.keys(props.errors).length > 0) {
            state.errors = props.errors
            props.resetErrors()
            return state
        }
        return null
    }

    componentWillUnmount() {
        this.props.resetErrors()
    }

    onInputChange = (e) => {
        e.preventDefault()
        const { id, value } = e.target
        const form = Object.assign(this.state.form)
        form[id].value = value
        this.setState({ form })
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        const data = {}
        Object.entries(this.state.form).forEach(([id, input]) => data[id] = input.value)
        this.props.loginUser(data)
    }

    render() {
        const { classes } = this.props
        const { errors } = this.state

        return (
            <Grid container className={classes.root}>
                <Grid item className={classes.hero} xs={12} >
                    <div className={classes.heroContent}>
                        <Typography component="h3" variant="h3">
                            Log in to use our great features
                        </Typography>
                        <Typography component="p" variant="body1">
                            Some text about how great and unique this application is.
                        </Typography>
                    </div>
                </Grid>
                <Grid item className={classes.form}>
                    <Paper className={classes.paper}>
                        <form>
                            <Typography component="h4" variant="h4" className={classes.title}>
                                Log In
                            </Typography>
                            {Object.entries(this.state.form).map(([id, input]) => (
                                <TextField
                                    key={id}
                                    id={id}
                                    variant="outlined"
                                    fullWidth
                                    className={classes.textField}
                                    {...input}
                                    error={errors[id] && errors[id] !== ''}
                                    helperText={errors[id] || ''}
                                />
                            ))}
                            <Button type="submit" onClick={this.onFormSubmit} color="primary" variant="contained" fullWidth>
                                Log In
                            </Button>
                        </form>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Typography component="p" variant="body1">
                            Don't have an account yet? You can register <Link component={NavLink} to="/register">here</Link>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

const mapStateToProps = state => ({
    errors: state.errors,
})

export default connect(mapStateToProps, { loginUser, resetErrors, resetMessages })(withStyles(styles)(LogIn))