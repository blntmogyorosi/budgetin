import React from 'react'
import { Button } from '@material-ui/core'


import './Title.scss'


const Title = ({ children, component, button }) => {
    return (
        <div className="title">
            <h1 className={component}>
                {children}
            </h1>
            {button &&
                <Button {...button} />
            }
        </div>
    )
}

export default Title