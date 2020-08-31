import React from 'react'
import { NavLink } from 'react-router-dom'

import Units from '../../../containers/Units'
import Unit from '../Unit/Unit'
import { Box, BoxFooter, BoxHeader } from '../../Box'


const UnitList = ({ units, isWidget }) => {
    return (
        <Box className="unit-list-container">
            {isWidget &&
                <BoxHeader>
                    Units
                </BoxHeader>
            }
            <div className="unit-list">
                {units.map(unit => (
                    <Unit key={unit._id} unit={unit} />
                ))}
            </div>
            {isWidget &&
                <BoxFooter>
                    <NavLink to={Units.routeName}>See all</NavLink>
                </BoxFooter>
            }
        </Box>
    )
}

export default UnitList