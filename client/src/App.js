import React from 'react'
import { Switch } from 'react-router-dom'

import UnauthenticatedRoute from './hoc/Routes/UnauthenticatedRoute'
import AuthenticatedRoute from './hoc/Routes/AuthenticatedRoute'
import Home from './containers/Home'
import Register from './containers/Register'
import LogIn from './containers/LogIn'
import Dashboard from './containers/Dashboard'
import TransactionsPage from './containers/TransactionsPage'
import UnitsPage from './containers/UnitsPage'
import CategoriesPage from './containers/CategoriesPage'


const App = () => {
    return (
        <Switch>
            <UnauthenticatedRoute exact path={Home.routeName} component={Home} />
            <UnauthenticatedRoute path={Register.routeName} component={Register} />
            <UnauthenticatedRoute path={LogIn.routeName} component={LogIn} />
            <AuthenticatedRoute path={Dashboard.routeName} component={Dashboard} />
            <AuthenticatedRoute path={CategoriesPage.routeName} component={CategoriesPage} />
            <AuthenticatedRoute path={UnitsPage.routeName} component={UnitsPage} />
            <AuthenticatedRoute path={TransactionsPage.routeName} component={TransactionsPage} />
        </Switch>
    )
}

export default App