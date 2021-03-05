import React from 'react'
import { connect } from 'react-redux'

import TransactionForm from '../../components/TransactionForm/TransactionForm'


class TransactionEditPage extends React.Component {

    static routeName = '/:transaction/edit'

    constructor(props) {
        super(props)
        this.state = {
            transaction: {}
        }
    }

    static getDerivedStateFromProps(props, state) {
        const _id = props.match.params.transaction
        state.transaction = Object.values(props.transactions)
            .reduce((list, month) => ([...list, ...month]), [])
            .filter(t => t._id === _id)[0]
        return state
    }

    render() {
        return (
            <React.Fragment>
                <TransactionForm
                    transaction={this.state.transaction}
                />
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => ({
    transactions: state.transactions.dictionary,
})

export default connect(mapStateToProps)(TransactionEditPage)