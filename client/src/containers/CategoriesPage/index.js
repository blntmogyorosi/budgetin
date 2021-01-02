import React from 'react'
import { Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import AuthenticatedRoute from '../../hoc/Routes/AuthenticatedRoute'
import CategoryListPage from './CategoryListPage'
import CategoryFormPage from './CategoryFormPage'
import UserLayout from '../../hoc/Layout/UserLayout'
import { Grid } from '@material-ui/core'


const styles = theme => ({
    firstCol: {
        paddingRight: theme.spacing(1),
    },
    secondCol: {
        paddingLeft: theme.spacing(1),
    },
})

class TransactionsPage extends React.Component {

    static routeName = '/categories'

    render() {
        const { classes, match } = this.props

        return (
            <UserLayout>
                <Grid container>
                    <Grid item xs={12} md={6} className={classes.firstCol}>
                        <AuthenticatedRoute path={`${match.url}${CategoryListPage.routeName}`} component={CategoryListPage} />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.secondCol}>
                        <AuthenticatedRoute path={`${match.url}${CategoryFormPage.routeName}`} component={CategoryFormPage} />
                    </Grid>
                </Grid>
            </UserLayout>
        )
    }

}

export default withStyles(styles)(TransactionsPage)