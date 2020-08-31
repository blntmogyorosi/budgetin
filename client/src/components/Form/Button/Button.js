import React from 'react'

import './Button.scss'


const Button = ({ skin = 'primary', type, onClick, children }) => {
    return (
        <button type={type} onClick={onClick} className={`button button-${skin}`}>
            {children}
        </button>
    )
}

export default Button