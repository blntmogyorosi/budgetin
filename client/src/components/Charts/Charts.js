import React from 'react'
import { connect } from 'react-redux'

import { Box } from '../Box'
import CategoryChart from '../CategoryChart/CategoryChart'
import ProductChart from '../ProductChart/ProductChart'
import { fetchCategories } from '../../redux/actions/categoriesActions'
import { fetchProducts } from '../../redux/actions/productsActions'


class Charts extends React.Component {

    componentDidMount() {
        this.props.fetchCategories()
        this.props.fetchProducts()
    }

    render() {
        return (
            <Box>
                <ProductChart month="September" products={this.props.products.list} />
                <CategoryChart month="September" categories={this.props.categories.list} />
            </Box>
        )
    }

}

const mapStateToProps = state => ({
    categories: state.categories,
    products: state.products,
})

export default connect(mapStateToProps, { fetchCategories, fetchProducts })(Charts)