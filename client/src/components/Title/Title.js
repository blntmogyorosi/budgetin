import React from 'react'


const Title = ({ children, component }) => {
    return (
        <h1 className={component}>{children}</h1>
    )
}

export default Title