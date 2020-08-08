import React from 'react'

import './Input.css'


const Input = ({ type, label, value, onChange, id, error, info }) => {
    return (
        <div className="input-group">
            <div className="input-control">
                <input type={type} id={id} value={value} onChange={onChange} />
                <label htmlFor={id}>{label}</label>
            </div>
            {info && <div className="input-info">{info}</div>}
            {error && <div className="input-error">{error}</div>}
        </div>
    )
}

export default Input