import React from 'react'
import { Switch } from 'react-router-dom'

import AuthenticatedRoute from '../../hoc/Routes/AuthenticatedRoute'
import CategoryListPage from './CategoryListPage'
import CategoryFormPage from './CategoryFormPage'
import UserLayout from '../../hoc/Layout/UserLayout'
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core'
import CategoryDetailPage from './CategoryDetailPage'


const useStyles = makeStyles(theme => ({
    firstCol: {
        paddingRight: theme.spacing(1),
    },
    secondCol: {
        paddingLeft: theme.spacing(1),
    },
}))

const CategoriesPage = ({ match }) => {
    const isDesktopView = useMediaQuery(theme => theme.breakpoints.up('md'))
    const classes = useStyles()

    return (
        <UserLayout>
            {isDesktopView ?
                <Grid container>
                    <Grid item xs={12} md={6} className={classes.firstCol}>
                        <AuthenticatedRoute path={`${match.url}${CategoryListPage.routeName}`} component={CategoryListPage} />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.secondCol}>
                        <Switch>
                            <AuthenticatedRoute path={`${match.url}${CategoryFormPage.routeName}`} component={CategoryFormPage} />
                            <AuthenticatedRoute path={`${match.url}${CategoryDetailPage.routeName}`} component={CategoryDetailPage} />
                        </Switch>
                    </Grid>
                </Grid>
                :
                <Grid container>
                    <Grid item xs={12}>
                        <Switch>
                            <AuthenticatedRoute path={`${match.url}${CategoryListPage.routeName}`} component={CategoryListPage} exact />
                            <AuthenticatedRoute path={`${match.url}${CategoryFormPage.routeName}`} component={CategoryFormPage} />
                            <AuthenticatedRoute path={`${match.url}${CategoryDetailPage.routeName}`} component={CategoryDetailPage} />
                        </Switch>
                    </Grid>
                </Grid>
            }
        </UserLayout>
    )
}

CategoriesPage.routeName = '/categories'

export default CategoriesPage