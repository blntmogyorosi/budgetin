import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryDetail from '../../components/Category/CategoryDetail/CategoryDetail'


class CategoryDetailPage extends Component {

    static routeName = '/:category'

    constructor(props) {
        super(props)
        this.state = {
            category: {},
        }
    }

    static getDerivedStateFromProps(props, state) {
        const _id = props.match.params.category
        state.category = props.categories.find(c => c._id === _id)
        return state
    }

    render() {
        const { category } = this.state

        const transactions = Object.values(this.props.transactions)
            .reduce(
                (list, month) => ([...list, ...month.filter(i => i.category === category._id)]),
                []
            )

        return (
            <React.Fragment>
                <CategoryDetail
                    category={this.state.category}
                    transactions={transactions}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories.list,
    transactions: state.transactions.dictionary,
})

export default connect(mapStateToProps, null)(CategoryDetailPage)