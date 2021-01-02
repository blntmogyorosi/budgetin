import React, { useState } from 'react'
import { Grid, GridList, GridListTile, Icon, Input, makeStyles } from '@material-ui/core'
import Modal from '../Modal/Modal'


const useStyle = makeStyles(theme => ({
    unitSelector: {
        width: '100%',
        height: '100%',
    },
    selectedUnit: {
        border: '1px solid transparent',
        borderColor: theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
    },
    unitSelectorModal: {
        width: theme.spacing(48),
    },
    unit: {
        display: 'block',
        padding: theme.spacing(2),
        fontSize: theme.spacing(2),
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
    },
}))

const UnitSelector = ({ units, onChange, name, value, idPrefix }) => {
    const [open, setOpen] = useState(false)
    const classes = useStyle()

    const selectUnit = (e) => {
        setOpen(false)
        onChange(e)
    }

    const selectedUnit = units.find(i => i.value === value)

    return (
        <div className={classes.unitSelector}>
            <div className={`${classes.unit} ${classes.selectedUnit}`} onClick={() => setOpen(true)}>
                {selectedUnit && selectedUnit.label ?
                    <span>
                        {selectedUnit.label}
                    </span>
                    :
                    <span>
                        No Unit selected
                    </span>
                }
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Grid container className={classes.unitSelectorModal}>
                    {units.map(unit => (
                        <Grid item key={unit.value} xs={12}>
                            <label className={classes.unit}>
                                <Input
                                    type="radio"
                                    name={name}
                                    id={`${idPrefix}_${unit.name}`}
                                    value={unit.value}
                                    onChange={selectUnit}
                                />
                                <span>{unit.label}</span>
                            </label>
                        </Grid>
                    ))}
                </Grid>
            </Modal>
        </div>
    )
}

export default UnitSelector