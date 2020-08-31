import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Layout from '../hoc/Layout/Layout'
import { Container } from '../hoc/Container'
import Title from '../components/Title/Title'
import CategoryList from '../components/Category/CategoryList/CategoryList'
import UnitList from '../components/Unit/UnitList/UnitList'
import TransactionList from '../components/Transaction/TransactionList/TransactionList'
import { fetchCategories } from '../redux/actions/categoriesActions'
import { fetchUnits } from '../redux/actions/unitsActions'
import { fetchTransactions } from '../redux/actions/transactionsActions'


class Dashboard extends React.Component {

    static routeName = '/dashboard'

    componentDidMount() {
        this.props.fetchCategories()
        this.props.fetchUnits()
        this.props.fetchTransactions()
    }

    render() {
        return (
            <Layout>
                <Container>
                    <Title component="h2">Dashboard</Title>
                    <div style={{ display: 'flex' }}>
                        <CategoryList categories={this.props.categories.list.slice(0, 3)} isWidget />
                        <UnitList units={this.props.units.list.slice(0, 3)} isWidget />
                    </div>
                    <TransactionList transactions={{ [moment().format("YYYY-MM-DD")]: this.props.transactions.dictionary[moment().format("YYYY-MM-DD")] || [] }} isWidget />
                </Container>
            </Layout>
        )
    }

}

const mapStateToProps = state => ({
    categories: state.categories,
    transactions: state.transactions,
    units: state.units,
})

export default connect(mapStateToProps, { fetchCategories, fetchUnits, fetchTransactions })(Dashboard)