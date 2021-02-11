import React from 'react'
import { NavLink } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import {
    Apartment as ApartmentIcon,
    Category as CategoryIcon,
    Dashboard as DashboardIcon,
    FolderShared as FolderSharedIcon,
    Receipt as ReceiptIcon,
    Settings as SettingsIcon,
} from '@material-ui/icons'

import Dashboard from '../../../containers/Dashboard'
import TransactionsPage from '../../../containers/TransactionsPage'
import CategoriesPage from '../../../containers/CategoriesPage'
import UnitsPage from '../../../containers/UnitsPage'


const useStyles = makeStyles(theme => ({
    listItemIcon: {
        minWidth: theme.spacing(4),
    },
}))

const UserMenu = () => {
    const classes = useStyles()

    return (
        <List component="nav">
            <ListItem button component={NavLink} to={'/accounts'}>
                <ListItemIcon className={classes.listItemIcon}>
                    <FolderSharedIcon />
                </ListItemIcon>
                <ListItemText primary="Accounts" />
            </ListItem>
            <ListItem button component={NavLink} to={Dashboard.routeName}>
                <ListItemIcon className={classes.listItemIcon}>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={NavLink} to={TransactionsPage.routeName}>
                <ListItemIcon className={classes.listItemIcon}>
                    <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Transactions" />
            </ListItem>
            <ListItem button component={NavLink} to={CategoriesPage.routeName}>
                <ListItemIcon className={classes.listItemIcon}>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
            </ListItem>
            <ListItem button component={NavLink} to={UnitsPage.routeName}>
                <ListItemIcon className={classes.listItemIcon}>
                    <ApartmentIcon />
                </ListItemIcon>
                <ListItemText primary="Units" />
            </ListItem>
            <ListItem button component={NavLink} to={'/settings'}>
                <ListItemIcon className={classes.listItemIcon}>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>
        </List>
    )
}

export default UserMenu