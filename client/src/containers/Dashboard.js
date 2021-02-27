import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Grid, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import UserLayout from '../hoc/Layout/UserLayout'

import { fetchCategories } from '../redux/actions/categoriesActions'
import { fetchUnits } from '../redux/actions/unitsActions'
import { fetchProducts } from '../redux/actions/productsActions'
import { fetchTransactions } from '../redux/actions/transactionsActions'
import CategoryChart from '../components/CategoryChart/CategoryChart'
import MonthSelector from '../components/MonthSelector/MonthSelector'
import UnitChart from '../components/UnitChart/UnitChart'
import ProductTable from '../components/Product/ProductTable/ProductTable'
import { fetchData } from '../fetchData'
import Loading from '../components/Loading/Loading'


const styles = theme => ({
    grid: {
        justifyContent: 'space-between',
    },
    gridItem: {
        maxWidth: '49%',
        flexBasis: '49%',
        marginBottom: theme.spacing(2),
    },
})

class Dashboard extends React.Component {

    static routeName = '/dashboard'

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
        }
    }

    componentDidMount() {
        // fetchData()
        //     .then(() => {
        //         this.setState({ loaded: true })
        //     })
    }

    render() {
        // if (!this.state.loaded) {
        //     return (
        //         <UserLayout>
        //             <Loading />
        //         </UserLayout>
        //     )
        // }

        const { classes, date: { month, year } } = this.props

        const transactions = this.props.transactions.dictionary[`${year}-${month}`] || []
        const { categories, units } = this.props

        const allTransactions = Object.values(this.props.transactions.dictionary)
            .reduce((list, month) => ([...list, ...month]), [])

        return (
            <UserLayout>
                <Grid container>
                    <Grid item xs={12}>
                        <MonthSelector />
                    </Grid>
                    <Grid container className={classes.grid}>
                        <Grid item xs={12} md={6} className={classes.gridItem}>
                            <CategoryChart
                                month={`${moment().month(month - 1).format('MMM')}, ${year}`}
                                transactions={transactions}
                                categories={categories}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.gridItem}>
                            <Paper>
                                <CategoryChart
                                    month="All Time"
                                    transactions={allTransactions}
                                    categories={categories}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.grid}>
                        <Grid item xs={12} md={6} className={classes.gridItem}>
                            <UnitChart
                                month={`${moment().month(month - 1).format('MMM')}, ${year}`}
                                transactions={transactions}
                                units={units}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.gridItem}>
                            <UnitChart
                                month="All Time"
                                transactions={allTransactions}
                                units={units}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.grid}>
                        <Grid item xs={12} md={6}>
                            <ProductTable
                                transactions={transactions}
                            />
                        </Grid>
                    </Grid>
                </Grid>

            </UserLayout>
        )
    }

}

const mapStateToProps = state => ({
    categories: state.categories.list,
    date: state.date,
    transactions: state.transactions,
    units: state.units.list,
    products: state.products,
})

export default connect(mapStateToProps, { fetchCategories, fetchUnits, fetchTransactions, fetchProducts })(withStyles(styles)(Dashboard))