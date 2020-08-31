import React from 'react'
import { NavLink } from 'react-router-dom'

import './Brand.scss'


const Brand = () => {
    return (
        <NavLink className="brand" to="/">budgeting</NavLink>
    )
}

export default Brand