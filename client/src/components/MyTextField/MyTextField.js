import React from 'react'
import { Grid, TextField } from '@material-ui/core'


const MyTextField = ({ grid, type, id, name, label, placeholder, variant, value, defaultValue, onChange, InputProps, fullWidth, autoFocus }) => {
    return (
        <Grid item {...grid}>
            <TextField
                type={type}
                id={id}
                name={name}
                label={label}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                variant={variant}
                InputProps={InputProps}
                fullWidth={fullWidth}
                autoFocus={autoFocus}
            />
        </Grid>
    )
}

export default MyTextField