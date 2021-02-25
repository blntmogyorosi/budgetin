import React, { useState } from 'react'
import clsx from 'clsx'
import { AppBar, Button, Drawer, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FolderShared as AccountIcon, Menu as MenuIcon, ExitToApp as LogOutIcon } from '@material-ui/icons'

import UserMenu from '../../components/Navigation/UserMenu/UserMenu'
import { logoutUser } from '../../redux/actions/authActions'


const drawerWidth = 250

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: 1200,
    },
    toolbar: {
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toolbarMenu: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    container: {
        maxWidth: theme.breakpoints.values.lg,
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

    const [accountsMenu, setAccountsMenu] = useState(null)
    const accountsMenuClick = e => { setAccountsMenu(e.currentTarget) }
    const accountsMenuClose = () => { setAccountsMenu(null) }

    const [tDrawerOpen, setTDrawerOpen] = useState(false)
    const toggleTDrawerOpen = () => { setTDrawerOpen(!tDrawerOpen) }

    const [pDrawerOpen, setPDrawerOpen] = useState(true)
    const togglePDrawerOpen = () => { setPDrawerOpen(!pDrawerOpen) }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.toolbarMenu}>
                        <IconButton color="inherit" edge="start" onClick={togglePDrawerOpen} className={`${classes.menuButton} ${classes.persistentMenuButton}`}>
                            <MenuIcon />
                        </IconButton>
                        <IconButton color="inherit" edge="start" onClick={toggleTDrawerOpen} className={`${classes.menuButton} ${classes.temporaryMenuButton}`}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Budgetin
                        </Typography>
                    </div>
                    <div>
                        <Button
                            startIcon={<AccountIcon />}
                            onClick={accountsMenuClick}
                            color="inherit"
                        >
                            Main
                        </Button>
                        <Menu
                            open={Boolean(accountsMenu)}
                            onClose={accountsMenuClose}
                            anchorEl={accountsMenu}
                            keepMounted
                        >
                            <MenuItem onClick={accountsMenuClose}>Current</MenuItem>
                            <MenuItem onClick={accountsMenuClose}>Next One</MenuItem>
                            <MenuItem onClick={accountsMenuClose}>Last One</MenuItem>
                        </Menu>
                        <Button
                            startIcon={<LogOutIcon />}
                            onClick={logoutUser}
                            color="inherit"
                        >
                            Log Out
                        </Button>
                    </div>
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
                <UserMenu />
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
                <UserMenu />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: pDrawerOpen,
                })}
            >
                <Toolbar />
                <div className={classes.container}>
                    {children}
                </div>
            </main>
        </div>
    );
}

export default UserLayout