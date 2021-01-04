import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import UnitsPage from '.'
import UnitFormPage from './UnitFormPage'
import Title from '../../components/Title/Title'
import UnitList from '../../components/Unit/UnitList/UnitList'
import { fetchUnits } from '../../redux/actions/unitsActions'
import { Paper } from '@material-ui/core'


class UnitListPage extends React.Component {

    static routeName = '/'

    componentDidMount() {
        this.props.fetchUnits()
    }

    render() {
        return (
            <React.Fragment>
                <Title
                    component="h2"
                    button={{ children: 'New Unit', onClick: () => this.props.history.push(`${UnitsPage.routeName}${UnitFormPage.routeName}`), color: 'primary', variant: 'contained' }}
                >
                    Units
                </Title>
                <Paper>
                    <UnitList units={this.props.units.list} />
                </Paper>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => ({
    units: state.units,
})

export default connect(mapStateToProps, { fetchUnits })(withRouter(UnitListPage))