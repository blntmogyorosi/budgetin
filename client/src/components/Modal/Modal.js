import React from 'react'
import { makeStyles } from '@material-ui/core'


const useStyle = makeStyles(theme => ({
    modal: {
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, .4)',
        cursor: 'pointer',
        zIndex: 1500,
    },
    modalChildren: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90vw',
        maxHeight: '90vh',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        borderRadius: theme.spacing(1),
        zIndex: 1501,
        overflowY: 'auto',
        overflowX: 'hidden',
    }
}))

const Modal = ({ children, onClose, open }) => {
    const classes = useStyle()
    
    if (!open) return null
    return (
        <div className={classes.modal}>
            <div className={classes.modalOverlay} onClick={onClose} />
            <div className={classes.modalChildren}>
                {children}
            </div>
        </div>
    )
}

export default Modal