import React, { useState } from 'react'
import clsx from 'clsx'
import { AppBar, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Apartment as ApartmentIcon, Category as CategoryIcon, Dashboard as DashboardIcon, Menu as MenuIcon, Receipt as ReceiptIcon } from '@material-ui/icons'
import { NavLink } from 'react-router-dom'
import Dashboard from '../../containers/Dashboard'
import TransactionsPage from '../../containers/TransactionsPage'
import CategoriesPage from '../../containers/CategoriesPage'
import UnitsPage from '../../containers/UnitsPage'


const drawerWidth = 250

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: 1200,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    persistentMenuButton: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'block',
        },
    },
    temporaryMenuButton: {
        display: 'block',
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    persistentDrawer: {
        display: 'none',
        zIndex: 1000,
        pointerEvents: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'block',
        },
    },
    temporaryDrawer: {
        display: 'block',
        zIndex: 1250,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth,
        pointerEvents: 'auto',
    },
    drawerItemIcon: {
        minWidth: theme.spacing(4),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(3),
        },
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}))

const Menu = () => {
    const classes = useStyles()

    return (
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
    )
}

const UserLayout = ({ children }) => {
    const classes = useStyles()

    const [tDrawerOpen, setTDrawerOpen] = useState(false)
    const toggleTDrawerOpen = () => { setTDrawerOpen(!tDrawerOpen) }

    const [pDrawerOpen, setPDrawerOpen] = useState(true)
    const togglePDrawerOpen = () => { setPDrawerOpen(!pDrawerOpen) }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={togglePDrawerOpen} className={`${classes.menuButton} ${classes.persistentMenuButton}`}>
                        <MenuIcon />
                    </IconButton>
                    <IconButton color="inherit" edge="start" onClick={toggleTDrawerOpen} className={`${classes.menuButton} ${classes.temporaryMenuButton}`}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Budgetin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={`${classes.drawer} ${classes.persistentDrawer}`}
                variant="persistent"
                anchor="left"
                open={pDrawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <Menu />
            </Drawer>
            <Drawer
                className={`${classes.drawer} ${classes.temporaryDrawer}`}
                variant="temporary"
                anchor="left"
                open={tDrawerOpen}
                onClose={toggleTDrawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Menu />
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