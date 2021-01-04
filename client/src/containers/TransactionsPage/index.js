import React from 'react'
import { Switch } from 'react-router-dom'

import AuthenticatedRoute from '../../hoc/Routes/AuthenticatedRoute'
import UserLayout from '../../hoc/Layout/UserLayout'
import TransactionListPage from './TransactionListPage'
import TransactionFormPage from './TransactionFormPage'
import TransactionDetailPage from './TransactionDetailPage'
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core'
import MonthSelector from '../../components/MonthSelector/MonthSelector'


const useStyles = makeStyles(theme => ({
    firstCol: {
        paddingRight: theme.spacing(1),
    },
    secondCol: {
        paddingLeft: theme.spacing(1),
    },
}))

const TransactionsPage = ({ match }) => {
    const isDesktopView = useMediaQuery(theme => theme.breakpoints.up('md'))
    const classes = useStyles()

    return (
        <UserLayout>
            {isDesktopView ?
                <Grid container>
                    <Grid item xs={12}>
                        <MonthSelector />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.firstCol}>
                        <AuthenticatedRoute path={`${match.url}${TransactionListPage.routeName}`} component={TransactionListPage} />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.secondCol}>
                        <Switch>
                            <AuthenticatedRoute path={`${match.url}${TransactionFormPage.routeName}`} component={TransactionFormPage} />
                            <AuthenticatedRoute path={`${match.url}${TransactionDetailPage.routeName}`} component={TransactionDetailPage} />
                        </Switch>
                    </Grid>
                </Grid>
                :
                <Grid container>
                    <Grid item xs={12}>
                        <MonthSelector />
                    </Grid>
                    <Grid item xs={12}>
                        <Switch>
                            <AuthenticatedRoute path={`${match.url}${TransactionListPage.routeName}`} component={TransactionListPage} exact />
                            <AuthenticatedRoute path={`${match.url}${TransactionFormPage.routeName}`} component={TransactionFormPage} />
                            <AuthenticatedRoute path={`${match.url}${TransactionDetailPage.routeName}`} component={TransactionDetailPage} />
                        </Switch>
                    </Grid>
                </Grid>
            }
        </UserLayout>
    )
}

TransactionsPage.routeName = '/transactions'

export default TransactionsPage