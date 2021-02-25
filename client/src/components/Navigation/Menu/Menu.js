import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Home from '../../../containers/Home'
import Register from '../../../containers/Register'
import LogIn from '../../../containers/LogIn'
import Dashboard from '../../../containers/Dashboard'
import Categories from '../../../containers/Categories'
import Units from '../../../containers/Units'
import TransactionsPage from '../../../containers/TransactionsPage'
import { logoutUser } from '../../../redux/actions/authActions'


const Menu = ({ auth, logoutUser }) => {
    return (
        <nav className="menu">
            <ul className="menu-items">
                {auth.isAuthenticated ?
                    <React.Fragment>
                        <li className="menu-item">
                            <NavLink className="menu-item-link" to={Dashboard.routeName}>Dashboard</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink className="menu-item-link" to={Categories.routeName}>Categories</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink className="menu-item-link" to={Units.routeName}>Units</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink className="menu-item-link" to={TransactionsPage.routeName}>Transactions</NavLink>
                        </li>
                        <li className="menu-item">
                            <button className="menu-item-link" onClick={logoutUser}>Log Out</button>
                        </li>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <li className="menu-item">
                            <NavLink className="menu-item-link" to={Home.routeName}>Home</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink className="menu-item-link" to={Register.routeName}>Register</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink className="menu-item-link" to={LogIn.routeName}>Log In</NavLink>
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