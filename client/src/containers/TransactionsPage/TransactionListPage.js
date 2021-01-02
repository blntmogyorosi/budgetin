import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { SmallContainer } from '../../hoc/Container'
import TransactionsPage from '.'
import TransactionFormPage from './TransactionFormPage'
import Title from '../../components/Title/Title'
import { fetchTransactions } from '../../redux/actions/transactionsActions'
import TransactionList from '../../components/TransactionList/TransactionList'


class TransactionListPage extends React.Component {

    static routeName = '/'

    componentDidMount() {
        this.props.fetchTransactions()
    }

    render() {
        return (
            <React.Fragment>
                <Title
                    component="h2"
                    button={{ children: 'New Transaction', onClick: () => this.props.history.push(`${TransactionsPage.routeName}${TransactionFormPage.routeName}`), color: 'primary', variant: 'contained', }}
                >
                    Transactions
                </Title>
                <TransactionList transactions={this.props.transactions.dictionary["2020-11"] || []} />
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => ({
    transactions: state.transactions,
})

export default connect(mapStateToProps, { fetchTransactions })(withRouter(TransactionListPage))