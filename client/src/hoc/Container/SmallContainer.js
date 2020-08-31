import React from 'react'

import './Container.scss'


const SmallContainer = ({ children }) => {
    return (
        <div className="container small-container">
            {children}
        </div>
    )
}

export default SmallContainer