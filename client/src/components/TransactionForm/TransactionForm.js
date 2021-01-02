import React from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Grid, Input, InputAdornment, Paper, TextField, Typography, withStyles } from '@material-ui/core'

import IconSelector from '../IconSelector/IconSelector'
import TypeSelector from '../TypeSelector/TypeSelector'
import MyTextField from '../MyTextField/MyTextField'
import UnitSelector from '../UnitSelector/UnitSelector'


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
    inputListItem: {
        marginBottom: theme.spacing(1),
    }
})

class TransactionForm extends React.Component {

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
                category: {
                    component: IconSelector,
                    id: 'category',
                    name: 'category',
                    value: '',
                    onChange: this.onInputChange,
                    icons: [],
                    grid: {
                        xs: 12,
                    },
                },
                unit: {
                    component: UnitSelector,
                    id: 'unit',
                    name: 'unit',
                    value: '',
                    onChange: this.onInputChange,
                    units: [],
                    grid: {
                        xs: 12
                    },
                },
                performedOn: {
                    component: MyTextField,
                    id: 'performedOn',
                    type: 'date',
                    name: 'performedOn',
                    variant: 'outlined',
                    label: 'Performed On',
                    value: moment().format('YYYY-MM-DD'),
                    onChange: this.onInputChange,
                    fullWidth: true,
                    grid: {
                        xs: 12,
                    },
                },
                productList: [],
            },
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.form.category.icons.length === 0)
            state.form.category.icons = props.categories.list.map(c => ({ value: c._id, name: c.icon, label: c.name, color: c.color }))
        if (state.form.unit.units.length === 0)
            state.form.unit.units = props.units.list.map(u => ({ value: u._id, label: u.name }))
        return state
    }

    onInputChange = (e) => {
        const { name, value } = e.target
        const { form } = this.state
        form[name].value = value
        this.setState({ form })
    }


    onFormSubmit = (e) => {
        e.preventDefault()
        // this.props.saveCategory(
        //     this.state,
        //     (category) => {
        //         if (this.props.onReady) this.props.onReady(category)
        //     }
        // )
    }

    onProductListAdd = (e) => {
        e.preventDefault()
        const { form } = this.state
        if (
            form.productList.length !== 0 &&
            (
                form.productList[form.productList.length - 1].name.value === '' ||
                form.productList[form.productList.length - 1].value.value === ''
            )
        ) return null
        form.productList.push(
            {
                name: {
                    component: MyTextField,
                    type: 'text',
                    placeholder: 'Name',
                    value: '',
                    onChange: this.onProductListChange,
                    autoFocus: true,
                    fullWidth: true,
                    grid: {
                        xs: 6,
                    },
                },
                value: {
                    component: MyTextField,
                    type: 'number',
                    placeholder: 'Value',
                    value: '',
                    onChange: this.onProductListChange,
                    InputProps: {
                        endAdornment: <InputAdornment position="end">Ft</InputAdornment>,
                    },
                    fullWidth: true,
                    grid: {
                        xs: 6,
                    },
                },
            }
        )
        this.setState({ form })
    }

    onProductListChange = (e) => {
        const { form } = this.state
        const { id, value } = e.target
        const [, index, field] = id.split('_')
        form.productList[index][field].value = value
        this.setState({ form })
    }

    renderInput = (input) => {
        const { grid, component: Component, ...props } = input
        return (
            <Grid item {...grid} className={this.props.classes.gridItem}>
                <Component
                    {...props}
                />
            </Grid>
        )
    }

    renderProductListInput = () => {
        const { productList } = this.state.form
        return (
            <Grid item xs={12} className={this.props.classes.gridItem}>
                {productList.length === 0 ?
                    <Typography component="p" variant="body1">
                        No products have been added yet to this transaction
                    </Typography>
                    :
                    productList.map((p, i) => (
                        <Grid key={`productList_${i}`} item xs={12} className={this.props.classes.inputListItem}>
                            {Object.entries(p).map(([id, input]) => this.renderInput(input))}
                        </Grid>
                    ))}
            </Grid>
        )
    }

    render() {
        const { category, classes } = this.props

        return (
            <Paper className={classes.paper}>
                <form>
                    <Typography variant="h4" component="h4" className={classes.title}>
                        {category && category._id ? 'Edit Transaction' : 'New Transaction'}
                    </Typography>
                    <Grid container>
                        <Grid item xs={3}>
                            {this.renderInput(this.state.form.category)}
                        </Grid>
                        <Grid item xs={9} style={{ paddingLeft: '8px' }}>
                            {this.renderInput(this.state.form.unit)}
                            {this.renderInput(this.state.form.performedOn)}
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item xs={12} className={classes.gridItem}>
                                <Button type="button" color="primary" variant="contained" onClick={this.onProductListAdd} fullWidth>
                                    Add Product
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {this.renderProductListInput()}
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
    categories: state.categories,
    errors: state.errors,
    units: state.units,
})

export default connect(mapStateToProps, {})(withRouter(withStyles(styles)(TransactionForm)))