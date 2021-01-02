import React from 'react'
import { Switch } from 'react-router-dom'

import AuthenticatedRoute from '../../hoc/Routes/AuthenticatedRoute'
import UserLayout from '../../hoc/Layout/UserLayout'
import TransactionListPage from './TransactionListPage'
import TransactionFormPage from './TransactionFormPage'
import TransactionDetailPage from './TransactionDetailPage'
import { Grid, withStyles } from '@material-ui/core'


const styles = theme => ({
    firstCol: {
        paddingRight: theme.spacing(1),
    },
    secondCol: {
        paddingLeft: theme.spacing(1),
    },
})

class TransactionsPage extends React.Component {

    static routeName = '/transactions'

    render() {
        const { match, classes } = this.props

        return (
            <UserLayout>
                <Grid container>
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
            </UserLayout>
        )
    }

}

export default withStyles(styles)(TransactionsPage)