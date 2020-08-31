import React from 'react'
import { Switch } from 'react-router-dom'

import AuthenticatedRoute from '../../hoc/Routes/AuthenticatedRoute'
import Layout from '../../hoc/Layout/Layout'
import CategoryListPage from './CategoryListPage'
import CategoryFormPage from './CategoryFormPage'


class TransactionsPage extends React.Component {

    static routeName = '/categories'

    render() {
        const { match } = this.props
        return (
            <Layout>
                <Switch>
                    <AuthenticatedRoute exact path={`${match.url}${CategoryListPage.routeName}`} component={CategoryListPage} />
                    <AuthenticatedRoute path={`${match.url}${CategoryFormPage.routeName}`} component={CategoryFormPage} />
                    {/* <AuthenticatedRoute path={`${match.url}${TransactionDetailPage.routeName}`} component={TransactionDetailPage} /> */}
                </Switch>
            </Layout>
        )
    }

}

export default TransactionsPage