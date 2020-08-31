import React from 'react'

import TransactionForm from '../../components/Transaction/TransactionForm/TransactionForm'
import { SmallContainer } from '../../hoc/Container'


class TransactionFormPage extends React.Component {

    static routeName = '/new'

    render() {
        return (
            <SmallContainer>
                <TransactionForm />
            </SmallContainer>
        )
    }

}

export default TransactionFormPage