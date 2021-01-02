import React from 'react'
import { connect } from 'react-redux'

import { SmallContainer } from '../../hoc/Container'
import TransactionDetail from '../../components/Transaction/TransactionDetail/TransactionDetail'
import { fetchTransaction } from '../../redux/actions/transactionsActions'


class TransactionListPage extends React.Component {

    static routeName = '/:transaction'

    constructor(props) {
        super(props)
        this.state = {
            transaction: {},
        }
    }

    static getDerivedStateFromProps(props, state) {
        const _id = props.match.params.transaction
        state.transaction = Object.values(props.transactions.dictionary)
            .reduce((list, month) => ([...list, ...month]), [])
            .filter(t => t._id === _id)[0]
        return state
    }

    render() {
        const { transactions } = this.props
        return (
            <React.Fragment>
                <TransactionDetail transaction={this.state.transaction} />
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => ({
    transactions: state.transactions,
})

export default connect(mapStateToProps, { fetchTransaction })(TransactionListPage)