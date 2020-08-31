import React from 'react'

import './BoxHeader.scss'


const BoxHeader = ({ children, className }) => {
    return (
        <div className={`box-header${className ? ` ${className}` : ''}`}>
            {children}
        </div>
    )
}

export default BoxHeader