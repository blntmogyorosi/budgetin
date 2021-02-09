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


const styles = theme => ({
    firstCol: {
        paddingRight: theme.spacing(1),
    },
    secondCol: {
        paddingLeft: theme.spacing(1),
    },
    chartContainer: {
    },
    chartItem: {
        flex: '0 1 auto',
        padding: theme.spacing(1),
        width: '50%',
    }
})

class Dashboard extends React.Component {

    static routeName = '/dashboard'

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchCategories()
        this.props.fetchUnits()
        this.props.fetchTransactions()
        this.props.fetchProducts()
    }

    render() {
        const { classes, date: { month, year } } = this.props

        const transactions = this.props.transactions.dictionary[`${year}-${month}`] || []

        return (
            <UserLayout>
                <Grid container>
                    <Grid item xs={12}>
                        <MonthSelector />
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={6} className={classes.firstCol}>
                            <CategoryChart
                                month={`${moment().month(month - 1).format('MMM')}, ${year}`}
                                categories={
                                    transactions
                                        .reduce((list, t) => {
                                            if (t.category.type !== "EXPENSE") return list
                                            const index = list.findIndex(i => i.name === t.category.name)
                                            if (index !== -1) {
                                                list[index].y += Math.abs(t.value)
                                            } else {
                                                list.push({
                                                    name: t.category.name,
                                                    label: t.category.name,
                                                    color: t.category.color,
                                                    y: Math.abs(t.value),
                                                })
                                            }
                                            return list
                                        }, [])
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.secondCol}>
                            <Paper>
                                <CategoryChart
                                    month="All Time"
                                    categories={
                                        this.props.categories.list
                                            .filter(t => t.transactionsSum !== 0 && t.type === "EXPENSE")
                                            .map(t => ({ name: t.name, y: t.transactionsSum, label: t.label, color: t.color }))
                                            .sort((prev, next) => prev.y > next.y)
                                    }
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={6} className={classes.firstCol}>
                            <UnitChart
                                month={""}
                                units={""}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.secondCol}>

                        </Grid>
                    </Grid>
                </Grid>

            </UserLayout>
        )
    }

}

const mapStateToProps = state => ({
    categories: state.categories,
    date: state.date,
    transactions: state.transactions,
    units: state.units,
    products: state.products,
})

export default connect(mapStateToProps, { fetchCategories, fetchUnits, fetchTransactions, fetchProducts })(withStyles(styles)(Dashboard))