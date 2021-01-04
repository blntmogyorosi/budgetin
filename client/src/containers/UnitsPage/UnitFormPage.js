import React from 'react'

import UnitsPage from '.'
import UnitForm from '../../components/Unit/UnitForm/UnitForm'


class UnitFormPage extends React.Component {

    static routeName = '/new'

    render() {
        return (
            <React.Fragment>
                <UnitForm onReady={() => this.props.history.push(`${UnitsPage.routeName}`)} />
            </React.Fragment>
        )
    }

}

export default UnitFormPage