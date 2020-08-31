import React from 'react'
import { connect } from 'react-redux'

import Layout from '../hoc/Layout/Layout'
import { SmallContainer } from '../hoc/Container'
import Title from '../components/Title/Title'
import CategoryList from '../components/Category/CategoryList/CategoryList'
import CategoryForm from '../components/Category/CategoryForm/CategoryForm'


class Categories extends React.Component {

    static routeName = '/categories'

    render() {
        return (
            <Layout>
                <SmallContainer>
                    <Title component="h2">Categories</Title>
                    <CategoryForm />
                    <CategoryList categories={this.props.categories} />
                </SmallContainer>
            </Layout>
        )
    }

}

const mapStateToProps = state => ({
    categories: state.categories,
})

export default connect(mapStateToProps, null)(Categories)