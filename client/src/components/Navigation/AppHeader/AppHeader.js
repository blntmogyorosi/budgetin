import React from 'react'

import Brand from '../Brand/Brand'
import Menu from '../Menu/Menu'

import './AppHeader.scss'


const AppHeader = () => {
    return (
        <header className="app-header">
            <Brand />
            <Menu />
        </header>
    )
}

export default AppHeader