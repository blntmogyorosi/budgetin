import React, { useState } from 'react'
import clsx from 'clsx';
import { AppBar, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Apartment as ApartmentIcon, Category as CategoryIcon, Dashboard as DashboardIcon, Menu as MenuIcon, Receipt as ReceiptIcon } from '@material-ui/icons'
import { NavLink } from 'react-router-dom';
import Dashboard from '../../containers/Dashboard';
import TransactionsPage from '../../containers/TransactionsPage'
import CategoriesPage from '../../containers/CategoriesPage'
import UnitsPage from '../../containers/UnitsPage'


const drawerWidth = 220

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: 1500,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 1495,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerItemIcon: {
        minWidth: theme.spacing(4),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}))

const UserLayout = ({ children }) => {
    const classes = useStyles()

    const [pDrawerOpen, setPDrawerOpen] = useState(true)
    const togglePDrawerOpen = () => { setPDrawerOpen(!pDrawerOpen) }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={togglePDrawerOpen} className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Budgetin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={pDrawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <List component="nav">
                        <ListItem button component={NavLink} to={Dashboard.routeName}>
                            <ListItemIcon className={classes.drawerItemIcon}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button component={NavLink} to={TransactionsPage.routeName}>
                            <ListItemIcon className={classes.drawerItemIcon}>
                                <ReceiptIcon />
                            </ListItemIcon>
                            <ListItemText primary="Transactions" />
                        </ListItem>
                        <ListItem button component={NavLink} to={CategoriesPage.routeName}>
                            <ListItemIcon className={classes.drawerItemIcon}>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItem>
                        <ListItem button component={NavLink} to={UnitsPage.routeName}>
                            <ListItemIcon className={classes.drawerItemIcon}>
                                <ApartmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Units" />
                        </ListItem>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: pDrawerOpen,
                })}
            >
                <Toolbar />
                {children}
            </main>
        </div>
    );
}

export default UserLayout