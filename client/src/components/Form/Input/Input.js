import React from 'react'

import './Input.scss'


const Input = ({ type, label, value, onChange, id, error, info, options, autoFocus }) => {
    switch (type) {
        case 'radio':
            return (
                <div className="input-group">
                    <div className="input-controls">
                        {options.map(option => (
                            <label key={`${id}_${option.value}`}>
                                <input type={type} id={id} name={id} value={option.value} checked={option.value === value} onChange={onChange} />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>
            )
        default:
            return (
                <div className="input-group">
                    <div className="input-control">
                        <input type={type} id={id} value={value} onChange={onChange} className={value ? 'filled' : ''} autoFocus={autoFocus} />
                        <label htmlFor={id}>{label}</label>
                    </div>
                    {info && <div className="input-info">{info}</div>}
                    {error && <div className="input-error">{error}</div>}
                </div>
            )
    }
}

export default Input