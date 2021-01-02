import React from 'react'
import { connect } from 'react-redux'

import CategoriesPage from '.'
import CategoryForm from '../../components/Category/CategoryForm/CategoryForm'
import { fetchTransactions } from '../../redux/actions/transactionsActions'


class CategoryFormPage extends React.Component {

    static routeName = '/new'

    componentDidMount() {
        
    }

    render() {
        return (
            <React.Fragment>
                <CategoryForm onReady={() => this.props.history.push(`${CategoriesPage.routeName}`)} />
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => ({
    transactions: state.transactions,
})

export default connect(mapStateToProps, { fetchTransactions })(CategoryFormPage)