import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import CategoriesPage from '.'
import CategoriesFormPage from './CategoryFormPage'
import Title from '../../components/Title/Title'
import CategoryList from '../../components/Category/CategoryList/CategoryList'
import { fetchCategories } from '../../redux/actions/categoriesActions'
import { Paper } from '@material-ui/core'


class CategoryListPage extends React.Component {

    static routeName = '/'

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        return (
            <React.Fragment>
                <Title
                    component="h2"
                    button={{ children: 'New Category', onClick: () => this.props.history.push(`${CategoriesPage.routeName}${CategoriesFormPage.routeName}`), color: 'primary', variant: 'contained' }}
                >
                    Categories
                </Title>
                <Paper>
                    <CategoryList categories={this.props.categories.list} />
                </Paper>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => ({
    categories: state.categories,
})

export default connect(mapStateToProps, { fetchCategories })(withRouter(CategoryListPage))