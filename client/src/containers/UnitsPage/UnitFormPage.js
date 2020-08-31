import React from 'react'

import { SmallContainer } from '../../hoc/Container'
import UnitForm from '../../components/Unit/UnitForm/UnitForm'


class UnitFormPage extends React.Component {

    static routeName = '/new'

    render() {
        return (
            <SmallContainer>
                <UnitForm />
            </SmallContainer>
        )
    }

}

export default UnitFormPage