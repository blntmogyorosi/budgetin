import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Home from '../../../containers/Home'
import Register from '../../../containers/Register'
import LogIn from '../../../containers/LogIn'
import Dashboard from '../../../containers/Dashboard'
import { logoutUser } from '../../../redux/actions/authActions'


const Menu = ({ auth, logoutUser }) => {
    return (
        <nav>
            <ul>
                {auth.isAuthenticated ?
                    <React.Fragment>
                        <li>
                            <NavLink to={Dashboard.routeName}>Dashboard</NavLink>
                        </li>
                        <li>
                            <button onClick={logoutUser}>Log Out</button>
                        </li>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <li>
                            <NavLink to={Home.routeName}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={Register.routeName}>Register</NavLink>
                        </li>
                        <li>
                            <NavLink to={LogIn.routeName}>Log In</NavLink>
                        </li>
                    </React.Fragment>
                }
            </ul>
        </nav>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(Menu)