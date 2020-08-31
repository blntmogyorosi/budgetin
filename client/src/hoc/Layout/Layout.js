import React from 'react'

import AppHeader from '../../components/Navigation/AppHeader/AppHeader'
import Messages from '../../components/Messages/Messages'
import AppContent from '../../components/Navigation/AppContent/AppContent'
import AppFooter from '../../components/Navigation/AppFooter/AppFooter'


class Layout extends React.Component {

    render() {
        return (
            <React.Fragment>
                <AppHeader />
                <Messages />
                <AppContent content={this.props.children} />
                <AppFooter />
            </React.Fragment>
        )
    }

}

export default Layout