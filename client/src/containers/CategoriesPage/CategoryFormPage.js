import React from 'react'
import { connect } from 'react-redux'

import { SmallContainer } from '../../hoc/Container'
import CategoryForm from '../../components/Category/CategoryForm/CategoryForm'
import { fetchTransactions } from '../../redux/actions/transactionsActions'


class CategoryFormPage extends React.Component {

    static routeName = '/new'

    componentDidMount() {
        console.log(this.props.match)
    }

    render() {
        return (
            <SmallContainer>
                <CategoryForm />
            </SmallContainer>
        )
    }

}

const mapStateToProps = state => ({
    transactions: state.transactions,
})

export default connect(mapStateToProps, { fetchTransactions })(CategoryFormPage)