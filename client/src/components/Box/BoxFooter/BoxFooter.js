import React from 'react'

import './BoxFooter.scss'


const BoxFooter = ({ children }) => {
    return (
        <div className="box-footer">
            {children}
        </div>
    )
}

export default BoxFooter