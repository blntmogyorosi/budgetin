import React from 'react'

import UnitsPage from '.'
import { SmallContainer } from '../../hoc/Container'
import UnitForm from '../../components/Unit/UnitForm/UnitForm'


class UnitFormPage extends React.Component {

    static routeName = '/new'

    render() {
        return (
            <SmallContainer>
                <UnitForm onReady={() => this.props.history.push(`${UnitsPage.routeName}`)} />
            </SmallContainer>
        )
    }

}

export default UnitFormPage