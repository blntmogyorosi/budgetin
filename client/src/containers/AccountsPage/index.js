import React from 'react'
import { Switch } from 'react-router-dom'
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core'

import UserLayout from '../../hoc/Layout/UserLayout'
import AuthenticatedRoute from '../../hoc/Routes/AuthenticatedRoute'


const useStyles = makeStyles(theme => ({
    grid: {},
    gridItem: {},
}))

const AccountsPage = ({ match }) => {
    const isDesktopView = useMediaQuery(theme => theme.breakpoints.up('md'))
    const classes = useStyles()

    return (
        <UserLayout>
            {isDesktopView ?
                <Grid container className={classes.grid}>
                    <Grid item xs={12} md={6} className={classes.gridItem}>
                        Account List
                </Grid>
                    <Grid item xs={12} md={6} className={classes.gridItem}>
                        Account Detail and Settings
                    </Grid>
                </Grid>
                :
                <Grid container>
                    <Grid item xs={12}>
                        {/* <Switch>
                            <AuthenticatedRoute />
                        </Switch> */}
                    </Grid>
                </Grid>
            }
        </UserLayout>
    )
}

AccountsPage.routeName = '/accounts'

export default AccountsPage