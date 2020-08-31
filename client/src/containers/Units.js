import React from 'react'
import { connect } from 'react-redux'

import Layout from '../hoc/Layout/Layout'
import { SmallContainer } from '../hoc/Container'
import Title from '../components/Title/Title'
import UnitList from '../components/Unit/UnitList/UnitList'
import UnitForm from '../components/Unit/UnitForm/UnitForm'


class Categories extends React.Component {

    static routeName = '/units'

    render() {
        return (
            <Layout>
                <SmallContainer>
                    <Title component="h2">Units</Title>
                    <UnitForm />
                    <UnitList units={this.props.units} />
                </SmallContainer>
            </Layout>
        )
    }

}

const mapStateToProps = state => ({
    units: state.units,
})

export default connect(mapStateToProps, null)(Categories)