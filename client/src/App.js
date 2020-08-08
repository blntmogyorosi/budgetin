import React from 'react'
import { Switch } from 'react-router-dom'

import UnauthenticatedRoute from './hoc/Routes/UnauthenticatedRoute'
import AuthenticatedRoute from './hoc/Routes/AuthenticatedRoute'
import Home from './containers/Home'
import Register from './containers/Register'
import LogIn from './containers/LogIn'
import Dashboard from './containers/Dashboard'


const App = () => {
    return (
        <Switch>
            <UnauthenticatedRoute exact path={Home.routeName} component={Home} />
            <UnauthenticatedRoute path={Register.routeName} component={Register} />
            <UnauthenticatedRoute path={LogIn.routeName} component={LogIn} />
            <AuthenticatedRoute path={Dashboard.routeName} component={Dashboard} />
        </Switch>
    )
}

export default App