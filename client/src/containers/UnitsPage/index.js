import React from 'react'
import { Switch } from 'react-router-dom'

import AuthenticatedRoute from '../../hoc/Routes/AuthenticatedRoute'
import Layout from '../../hoc/Layout/Layout'
import UnitListPage from './UnitListPage'
import UnitFormPage from './UnitFormPage'


class UnitsPage extends React.Component {

    static routeName = '/units'

    render() {
        const { match } = this.props
        return (
            <Layout>
                <Switch>
                    <AuthenticatedRoute exact path={`${match.url}${UnitListPage.routeName}`} component={UnitListPage} />
                    <AuthenticatedRoute path={`${match.url}${UnitFormPage.routeName}`} component={UnitFormPage} />
                    {/* <AuthenticatedRoute path={`${match.url}${TransactionDetailPage.routeName}`} component={TransactionDetailPage} /> */}
                </Switch>
            </Layout>
        )
    }

}

export default UnitsPage