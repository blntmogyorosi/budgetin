import React from 'react'

import './Box.scss'


const Box = ({ children, className }) => {
    return (
        <div className={`box${className ? ` ${className}` : ''}`}>
            {children}
        </div>
    )
}

export default Box