import React, { useState } from 'react'
import clsx from 'clsx'
import { AppBar, Drawer, IconButton, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Menu as MenuIcon } from '@material-ui/icons'
import UserMenu from '../../components/Navigation/UserMenu/UserMenu'


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
                {children}
            </main>
        </div>
    );
}

export default UserLayout