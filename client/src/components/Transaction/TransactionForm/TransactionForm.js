import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Box, BoxHeader, BoxFooter } from '../../Box'
import TransactionsPage from '../../../containers/TransactionsPage'
import Button from '../../Form/Button/Button'
import { fetchCategories } from '../../../redux/actions/categoriesActions'
import { fetchUnits } from '../../../redux/actions/unitsActions'
import { saveTransaction } from '../../../redux/actions/transactionsActions'

import './TransactionForm.scss'
import { Input, TextField } from '@material-ui/core'


class TransactionForm extends React.Component {

    componentDidMount() {
        this.props.fetchCategories()
        this.props.fetchUnits()
    }

    constructor(props) {
        super(props)
        this.state = {
            form: {
                category: {
                    type: 'radio',
                    label: 'Category',
                    value: '',
                    onChange: this.onInputChange,
                    options: this.props.categories.list.map(c => ({ value: c._id, label: c.name })),
                },
                unit: {
                    type: 'radio',
                    label: 'Unit',
                    value: '',
                    onChange: this.onInputChange,
                    options: this.props.units.list.map(u => ({ value: u._id, label: u.name })),
                },
                performedOn: {
                    type: 'date',
                    label: 'Perform Date',
                    value: '',
                    onChange: this.onInputChange,
                },
                productList: [],
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.form.category.options.length === 0)
            state.form.category.options = props.categories.list.map(c => ({ value: c._id, label: c.name }))
        if (state.form.unit.options.length === 0)
            state.form.unit.options = props.units.list.map(u => ({ value: u._id, label: u.name }))
        return state
    }

    renderCategorySelectInput = () => {
        return (
            <div className="category-select-input">
                <Input
                    id="category" {...this.state.form.category}
                />
            </div>
        )
    }

    renderUnitSelectInput = () => {
        return (
            <div className="unit-select-input">
                <Input
                    id="unit" {...this.state.form.unit}
                />
            </div>
        )
    }

    renderPerformDateInput = () => {
        return (
            <div className="perform-date-input">
                <TextField
                    id="performedOn" {...this.state.form.performedOn}
                />
            </div>
        )
    }

    renderProductListInput = () => {
        const { productList } = this.state.form
        return (
            <div className="product-list-input">
                <Button type="submit" onClick={this.onProductListAdd}>
                    Add product
                </Button>
                {productList.length > 0 ?
                    productList.map((p, i) => (
                        <div key={`productList_${i}`} className="product-list-item">
                            {Object.entries(p).map(([id, input]) => (
                                <Input
                                    key={`productList_${i}_${id}`}
                                    id={`productList_${i}_${id}`}
                                    {...input}
                                />
                            ))}
                        </div>
                    ))
                    :
                    <div>
                        No products have been added yet to this transaction.
                    </div>
                }
            </div>
        )
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
                    label: 'Name',
                    value: '',
                    onChange: this.onProductListChange,
                    autoFocus: true,
                },
                value: {
                    label: 'Value',
                    value: '',
                    onChange: this.onProductListChange,
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

    onInputChange = (e) => {
        const { id, value } = e.target
        const form = Object.assign(this.state.form)
        form[id].value = value
        this.setState({ form })
        this.forceUpdate()
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        const { form } = this.state
        const data = {
            category: form.category.value,
            unit: form.unit.value,
            performedOn: form.performedOn.value,
            productList: form.productList.map(p => ({ name: p.name.value, value: p.value.value }))
        }
        this.props.saveTransaction(data, (transaction) => this.props.history.push(`${TransactionsPage.routeName}/${transaction._id}`))
    }

    render() {
        const { transaction } = this.props

        return (
            <Box className="transaction-form">
                <form>
                    <BoxHeader>
                        {transaction && transaction._id ? 'Edit Transaction' : 'New Transaction'}
                    </BoxHeader>
                    {this.renderCategorySelectInput()}
                    {this.renderUnitSelectInput()}
                    {this.renderPerformDateInput()}
                    {this.renderProductListInput()}
                    <BoxFooter>
                        <Button type="submit" onClick={this.onFormSubmit}>
                            Save
                        </Button>
                        <Button type="button" skin="light" onClick={() => this.props.history.goBack()}>
                            Cancel
                        </Button>
                    </BoxFooter>
                </form>
            </Box>
        )
    }

}

const mapStateToProps = state => ({
    categories: state.categories,
    errors: state.errors,
    units: state.units,
})

export default connect(mapStateToProps, { saveTransaction, fetchCategories, fetchUnits })(withRouter(TransactionForm))