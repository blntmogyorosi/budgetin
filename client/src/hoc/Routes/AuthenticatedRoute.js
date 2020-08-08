import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import LogIn from '../../containers/LogIn'


const AuthenticatedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated ?
                <Component {...props} />
                :
                <Redirect to={LogIn.routeName} />
        }
    />
)

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AuthenticatedRoute)