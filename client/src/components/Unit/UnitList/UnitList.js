import React from 'react'
import { Grid } from '@material-ui/core'

import Unit from '../Unit/Unit'


const UnitList = ({ units }) => {
    return (
        <Grid container>
            {units.map(unit => (
                <Grid key={unit._id} item>
                    <Unit
                        unit={unit}
                        onClick={() => console.log(`/UnitsPage.routeName/${unit._id}`)}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default UnitList