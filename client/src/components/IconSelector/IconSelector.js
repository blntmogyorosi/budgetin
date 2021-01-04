import React, { useState } from 'react'
import { Grid, Icon, Input, makeStyles } from '@material-ui/core'
import Modal from '../Modal/Modal'


const useStyle = makeStyles(theme => ({
    iconSelector: {
        width: '100%',
        height: '100%',
    },
    selectedIcon: {
        border: '1px solid transparent',
        borderColor: theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
    },
    iconSelectorModal: {
        width: theme.spacing(35),
    },
    iconBox: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        border: '1px solid transparent',
        borderRadius: theme.spacing(1),
    },
    icon: {
        display: 'flex',
        flexFlow: 'nowrap column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 'min-content',
        padding: theme.spacing(2),
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
    },
    iconImg: {
        fontSize: theme.spacing(7),
    },
    iconName: {
        marginTop: theme.spacing(0.5),
        fontSize: theme.spacing(1.5),
    }
}))

const IconSelector = ({ icons, color, onChange, name, value, idPrefix }) => {
    const [open, setOpen] = useState(false)
    const classes = useStyle()
    
    const selectIcon = (e) => {
        setOpen(false)
        onChange(e)
    }
    
    const selectedIcon = icons.find(i => i.value === value)
    
    return (
        <div className={classes.iconSelector}>
            <div className={`${classes.icon} ${classes.selectedIcon}`} style={{ color: color || (selectedIcon && selectedIcon.color) }} onClick={() => setOpen(true)}>
                {selectedIcon && selectedIcon.name ?
                    <React.Fragment>
                        <Icon className={classes.iconImg}>{selectedIcon.name}</Icon>
                        {selectedIcon.label && <span className={classes.iconName}>{selectedIcon.label}</span>}
                    </React.Fragment>
                    :
                    <React.Fragment>
                        No Icon selected
                    </React.Fragment>
                }
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Grid container className={classes.iconSelectorModal}>
                    {icons.map(icon => (
                        <Grid item key={icon.name} xs={4}>
                            <label className={classes.icon} style={{ color: color || icon.color }}>
                                <Input
                                    type="radio"
                                    name={name}
                                    id={`${idPrefix}_${icon.name}`}
                                    value={icon.value}
                                    onChange={selectIcon}
                                    style={{ position: 'absolute', opacity: 0, }}
                                />
                                <Icon className={classes.iconImg}>{icon.name}</Icon>
                                {icon.label && <span className={classes.iconName}>{icon.label}</span>}
                            </label>
                        </Grid>
                    ))}
                </Grid>
            </Modal>
        </div>
    )
}

export default IconSelector