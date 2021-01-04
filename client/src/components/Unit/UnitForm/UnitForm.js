import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { saveUnit } from '../../../redux/actions/unitsActions'
import { resetErrors } from '../../../redux/actions/errorsAction'
import { Button, Grid, Paper, Typography, withStyles } from '@material-ui/core'
import MyTextField from '../../MyTextField/MyTextField'


const styles = theme => ({
    paper: {
        padding: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    title: {
        marginBottom: theme.spacing(4),
        textAlign: 'center',
    },
    gridItem: {
        marginBottom: theme.spacing(2),
    },
})

class UnitForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            form: {
                name: {
                    component: MyTextField,
                    id: 'name',
                    name: 'name',
                    type: 'text',
                    label: 'Name',
                    value: '',
                    onChange: this.onInputChange,
                    fullWidth: true,
                    variant: "outlined",
                },
            },
        }
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
        this.props.saveUnit(
            Object.entries(this.state.form).reduce((data, [id, input]) => { data[id] = input.value; return data; }, {}),
            (unit) => {
                if (this.props.onReady) this.props.onReady(unit)
            }
        )
    }

    render() {
        const { unit, errors, classes } = this.props

        return (
            <Paper className={classes.paper}>
                <form>
                    <Typography variant="h4" component="h4" className={classes.title}>
                        {unit && unit._id ? 'Edit Unit' : 'New Unit'}
                    </Typography>
                    <Grid container>
                        {Object.entries(this.state.form).map(([id, { component: Component, ...input }]) => (
                            <Grid item xs={12} className={classes.gridItem} key={id}>
                                <Component
                                    {...input}
                                    error={errors[id]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button type="submit" color="primary" variant="contained" onClick={this.onFormSubmit}>
                        Save
                    </Button>
                    <Button type="button" variant="contained" onClick={() => this.props.history.goBack()}>
                        Cancel
                    </Button>
                </form>
            </Paper>
        )
    }

}

const mapStateToProps = state => ({
    errors: state.errors,
})

export default connect(mapStateToProps, { saveUnit, resetErrors })(withRouter(withStyles(styles)(UnitForm)))