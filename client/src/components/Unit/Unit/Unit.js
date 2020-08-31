import React from 'react'


const Unit = ({ unit }) => {
    return (
        <div className="unit">
            <span className="unit-name">{unit.name}</span>
        </div>
    )
}

export default Unit