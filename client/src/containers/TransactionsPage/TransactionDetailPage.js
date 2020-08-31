import React from 'react'
import { connect } from 'react-redux'

import { SmallContainer } from '../../hoc/Container'
import TransactionDetail from '../../components/Transaction/TransactionDetail/TransactionDetail'
import { fetchTransaction } from '../../redux/actions/transactionsActions'


class TransactionListPage extends React.Component {

    static routeName = '/:transaction'

    componentDidMount() {
        this.props.fetchTransaction(this.props.match.params.transaction)
    }

    render() {
        const { transactions } = this.props
        return (
            <SmallContainer>
                {Object.keys(transactions.item).length > 0 && <TransactionDetail transaction={this.props.transactions.item} />}
            </SmallContainer>
        )
    }

}

const mapStateToProps = state => ({
    transactions: state.transactions,
})

export default connect(mapStateToProps, { fetchTransaction })(TransactionListPage)