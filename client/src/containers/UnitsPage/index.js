import React from 'react'
import { Switch } from 'react-router-dom'

import AuthenticatedRoute from '../../hoc/Routes/AuthenticatedRoute'
import UnitListPage from './UnitListPage'
import UnitFormPage from './UnitFormPage'
import UserLayout from '../../hoc/Layout/UserLayout'
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    mobileContent: {

    },
    firstCol: {
        paddingRight: theme.spacing(1),
    },
    secondCol: {
        paddingLeft: theme.spacing(1),
    },
}))

const UnitsPage = ({ match }) => {
    const isDesktopView = useMediaQuery(theme => theme.breakpoints.up('md'))
    const classes = useStyles()

    return (
        <UserLayout>
            {isDesktopView ?
                <Grid container>
                    <Grid item xs={12} md={6} className={classes.firstCol}>
                        <AuthenticatedRoute path={`${match.url}${UnitListPage.routeName}`} component={UnitListPage} />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.secondCol}>
                        <AuthenticatedRoute path={`${match.url}${UnitFormPage.routeName}`} component={UnitFormPage} />
                    </Grid>
                </Grid>
                :
                <Grid container>
                    <Grid item xs={12}>
                        <Switch>
                            <AuthenticatedRoute path={`${match.url}${UnitListPage.routeName}`} component={UnitListPage} exact />
                            <AuthenticatedRoute path={`${match.url}${UnitFormPage.routeName}`} component={UnitFormPage} />
                        </Switch>
                    </Grid>
                </Grid>
            }
        </UserLayout>
    )
}

UnitsPage.routeName = '/units'

export default UnitsPage