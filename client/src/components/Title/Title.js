import React from 'react'

import Button from '../Form/Button/Button'

import './Title.scss'


const Title = ({ children, component, button }) => {
    return (
        <div className="title">
            <h1 className={component}>
                {children}
            </h1>
            {button &&
                <Button onClick={button.onClick} skin={button.skin}>
                    {button.label}
                </Button>
            }
        </div>
    )
}

export default Title