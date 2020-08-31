import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { SmallContainer } from '../../hoc/Container'
import UnitsPage from '.'
import UnitFormPage from './UnitFormPage'
import Title from '../../components/Title/Title'
import UnitList from '../../components/Unit/UnitList/UnitList'
import { fetchUnits } from '../../redux/actions/unitsActions'


class UnitListPage extends React.Component {

    static routeName = '/'

    componentDidMount() {
        this.props.fetchUnits()
    }

    render() {
        return (
            <SmallContainer>
                <Title component="h2" button={{ label: 'New Unit', onClick: () => this.props.history.push(`${UnitsPage.routeName}${UnitFormPage.routeName}`) }}>
                    Units
                </Title>
                <UnitList units={this.props.units.list} />
            </SmallContainer>
        )
    }

}

const mapStateToProps = state => ({
    units: state.units,
})

export default connect(mapStateToProps, { fetchUnits })(withRouter(UnitListPage))