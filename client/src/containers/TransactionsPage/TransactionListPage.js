import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { SmallContainer } from '../../hoc/Container'
import TransactionsPage from '.'
import TransactionFormPage from './TransactionFormPage'
import Title from '../../components/Title/Title'
import TransactionList from '../../components/Transaction/TransactionList/TransactionList'
import { fetchTransactions } from '../../redux/actions/transactionsActions'


class TransactionListPage extends React.Component {

    static routeName = '/'

    componentDidMount() {
        this.props.fetchTransactions()
    }

    render() {
        return (
            <SmallContainer>
                <Title component="h2" button={{ label: 'New Transaction', onClick: () => this.props.history.push(`${TransactionsPage.routeName}${TransactionFormPage.routeName}`) }}>
                    Transactions
                </Title>
                <TransactionList transactions={this.props.transactions.dictionary} />
            </SmallContainer>
        )
    }

}

const mapStateToProps = state => ({
    transactions: state.transactions,
})

export default connect(mapStateToProps, { fetchTransactions })(withRouter(TransactionListPage))