import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Dashboard from '../../containers/Dashboard'

const UnauthenticatedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !auth.isAuthenticated ?
                <Component {...props} />
                :
                <Redirect to={Dashboard.routeName} />
        }
    />
)

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(UnauthenticatedRoute)