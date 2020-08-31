import React from 'react'

import './Container.scss'


const LargeContainer = ({ children }) => {
    return (
        <div className="container large-container">
            {children}
        </div>
    )
}

export default LargeContainer