import React from 'react'
import { Switch } from 'react-router-dom'

import AuthenticatedRoute from '../../hoc/Routes/AuthenticatedRoute'
import Layout from '../../hoc/Layout/Layout'
import TransactionListPage from './TransactionListPage'
import TransactionFormPage from './TransactionFormPage'
import TransactionDetailPage from './TransactionDetailPage'


class TransactionsPage extends React.Component {

    static routeName = '/transactions'

    render() {
        const { match } = this.props
        return (
            <Layout>
                <Switch>
                    <AuthenticatedRoute exact path={`${match.url}${TransactionListPage.routeName}`} component={TransactionListPage} />
                    <AuthenticatedRoute path={`${match.url}${TransactionFormPage.routeName}`} component={TransactionFormPage} />
                    <AuthenticatedRoute path={`${match.url}${TransactionDetailPage.routeName}`} component={TransactionDetailPage} />
                </Switch>
            </Layout>
        )
    }

}

export default TransactionsPage