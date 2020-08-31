import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { SmallContainer } from '../../hoc/Container'
import CategoriesPage from '.'
import CategoriesFormPage from './CategoryFormPage'
import Title from '../../components/Title/Title'
import CategoryList from '../../components/Category/CategoryList/CategoryList'
import { fetchCategories } from '../../redux/actions/categoriesActions'


class CategoryListPage extends React.Component {

    static routeName = '/'

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        return (
            <SmallContainer>
                <Title component="h2" button={{ label: 'New Category', onClick: () => this.props.history.push(`${CategoriesPage.routeName}${CategoriesFormPage.routeName}`) }}>
                    Categories
                </Title>
                <CategoryList categories={this.props.categories.list} />
            </SmallContainer>
        )
    }

}

const mapStateToProps = state => ({
    categories: state.categories,
})

export default connect(mapStateToProps, { fetchCategories })(withRouter(CategoryListPage))