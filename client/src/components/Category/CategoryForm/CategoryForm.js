import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { saveCategory } from '../../../redux/actions/categoriesActions'
import { resetErrors } from '../../../redux/actions/errorsAction'
import { Button, Grid, Paper, Typography, withStyles } from '@material-ui/core'
import IconSelector from '../../IconSelector/IconSelector'
import ColorSelector from '../../ColorSelector/ColorSelector'
import TypeSelector from '../../TypeSelector/TypeSelector'
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

const iconList = [
    { value: 'shopping_cart', name: 'shopping_cart' },
    { value: 'receipt_long', name: 'receipt_long' },
]

class CategoryForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            form: {
                type: {
                    component: TypeSelector,
                    id: 'type',
                    name: 'type',
                    value: '',
                    onChange: this.onInputChange,
                    grid: {
                        xs: 12,
                    },
                },
                color: {
                    component: ColorSelector,
                    id: 'color',
                    name: 'color',
                    value: '#000000',
                    onChange: this.onInputChange,
                    grid: {
                        xs: 12,
                    },
                },
                icon: {
                    component: IconSelector,
                    id: 'icon',
                    name: 'icon',
                    value: '',
                    onChange: this.onInputChange,
                    icons: process.env.ICON_LIST ? process.env.ICON_LIST.split(',').map(i => ({ value: i, name: i })) : iconList,
                    color: '#000000',
                    grid: {
                        xs: 12,
                    },
                },
                name: {
                    component: MyTextField,
                    id: 'name',
                    name: 'name',
                    variant: 'outlined',
                    label: 'Name',
                    value: '',
                    onChange: this.onInputChange,
                    fullWidth: true,
                    grid: {
                        xs: 12,
                    },
                },
            },
        }
    }

    componentWillUnmount() {
        this.props.resetErrors()
    }

    onInputChange = (e) => {
        const { name, value } = e.target
        const { form } = this.state
        form[name].value = value
        form.icon.color = form.color.value
        this.setState({ form })
    }


    onFormSubmit = (e) => {
        e.preventDefault()
        this.props.saveCategory(
            Object.values(this.state.form)
                .reduce((data, input) => {
                    data[input.name] = input.value
                    return data
                }, {}),
            (category) => {
                if (this.props.onReady) this.props.onReady(category)
            }
        )
    }

    renderInput = (input) => {
        return (
            <Grid item {...input.grid} className={this.props.classes.gridItem}>
                <input.component
                    {...input}
                />
            </Grid>
        )
    }

    render() {
        const { category, classes } = this.props

        console.log(process.env.ICON_LIST)

        return (
            <Paper className={classes.paper}>
                <form>
                    <Typography variant="h4" component="h4" className={classes.title}>
                        {category && category._id ? 'Edit Category' : 'New Category'}
                    </Typography>
                    <Grid container>
                        <Grid item xs={12}>
                            {this.renderInput(this.state.form.type)}
                        </Grid>
                        <Grid item xs={3} style={{ height: '100%' }}>
                            {this.renderInput(this.state.form.icon)}
                        </Grid>
                        <Grid item xs={9} style={{ paddingLeft: '8px' }}>
                            {this.renderInput(this.state.form.color)}
                            {this.renderInput(this.state.form.name)}
                        </Grid>
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
    errors: state.errors
})

export default connect(mapStateToProps, { saveCategory, resetErrors })(withRouter(withStyles(styles)(CategoryForm)))