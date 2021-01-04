import React from 'react'

import TransactionForm from '../../components/TransactionForm/TransactionForm'


class TransactionFormPage extends React.Component {

    static routeName = '/new'

    render() {
        return (
            <React.Fragment>
                <TransactionForm />
            </React.Fragment>
        )
    }

}

export default TransactionFormPage