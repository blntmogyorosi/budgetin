import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Grid, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import UserLayout from '../hoc/Layout/UserLayout'
import TransactionList from '../components/TransactionList/TransactionList'

import { fetchCategories } from '../redux/actions/categoriesActions'
import { fetchUnits } from '../redux/actions/unitsActions'
import { fetchProducts } from '../redux/actions/productsActions'
import { fetchTransactions } from '../redux/actions/transactionsActions'
import { previousMonth, nextMonth } from '../redux/actions/dateActions'
import CategoryChart from '../components/CategoryChart/CategoryChart'
import MonthSelector from '../components/MonthSelector/MonthSelector'


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
            year: moment().format('YYYY'),
            month: moment().format('MM'),
            monthlyTransactions: {},  // Holds the transactions for the selected month
            monthlyExpense: 0,
            monthlyIncome: 0,
            totalExpense: 0,
            totalIncome: 0,
        }
    }

    componentDidMount() {
        this.props.fetchCategories()
        this.props.fetchUnits()
        this.props.fetchTransactions(transactions => this.setTransactions(transactions))
        this.props.fetchProducts()
    }

    setTransactions = (transactions) => {
        const { year, month } = this.state
        const monthlyTransactions = {}
        let monthlyExpense = 0, monthlyIncome = 0, totalExpense = 0, totalIncome = 0
        for (let [date, transactionList] of Object.entries(transactions)) {
            if (date.startsWith(`${year}-${month}`)) {
                monthlyTransactions[date] = transactionList
                for (let transaction of transactionList) {
                    if (transaction.value > 0) {
                        monthlyIncome += transaction.value
                    } else {
                        monthlyExpense += transaction.value
                    }
                }
            } else {
                for (let transaction of transactionList) {
                    if (transaction.value > 0) {
                        totalIncome += transaction.value
                    } else {
                        totalExpense += transaction.value
                    }
                }
            }
        }
        this.setState({ monthlyTransactions, monthlyExpense, monthlyIncome, totalExpense, totalIncome })
    }

    render() {
        const { classes, date: { month, year } } = this.props

        const transactions = this.props.transactions.dictionary[`${year}-${month}`] || []

        return (
            <UserLayout>
                <Grid container>
                    <Grid item xs={12}>
                        <MonthSelector
                            month={month}
                            year={year}
                            monthlyExpense={transactions.reduce((sum, t) => {
                                if (t.category.type !== "EXPENSE") return sum
                                return sum + t.value
                            }, 0)}
                            monthlyIncome={transactions.reduce((sum, t) => {
                                if (t.category.type !== "INCOME") return sum
                                return sum + t.value
                            }, 0)}
                            totalExpense={
                                this.props.categories.list
                                    .filter(t => t.transactionsSum !== 0 && t.type === "EXPENSE")
                                    .reduce((sum, c) => sum + c.transactionsSum, 0)
                            }
                            totalIncome={
                                this.props.categories.list
                                    .filter(t => t.transactionsSum !== 0 && t.type === "INCOME")
                                    .reduce((sum, c) => sum + c.transactionsSum, 0)
                            }
                            previousMonth={this.props.previousMonth}
                            nextMonth={this.props.nextMonth}
                        />
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

export default connect(mapStateToProps, { fetchCategories, fetchUnits, fetchTransactions, fetchProducts, previousMonth, nextMonth  })(withStyles(styles)(Dashboard))