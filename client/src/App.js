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
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { pink, teal } from '@material-ui/core/colors'


const theme = createMuiTheme({
    palette: {
        primary: {
            main: teal[500],
            contrastText: '#fff',
        },
        secondary: {
            main: pink[500],
        },
    },
})

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Switch>
                <UnauthenticatedRoute exact path={Home.routeName} component={Home} />
                <UnauthenticatedRoute path={Register.routeName} component={Register} />
                <UnauthenticatedRoute path={LogIn.routeName} component={LogIn} />
                <AuthenticatedRoute path={Dashboard.routeName} component={Dashboard} />
                <AuthenticatedRoute path={'/categories'} component={CategoriesPage} />
                <AuthenticatedRoute path={UnitsPage.routeName} component={UnitsPage} />
                <AuthenticatedRoute path={TransactionsPage.routeName} component={TransactionsPage} />
            </Switch>
        </ThemeProvider>
    )
}

export default App