import React from 'react'
import CanvasJSReact from '../Chart/canvasjs.react'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    unitChart: {
        width: '100%',
        overflow: 'hidden',
    },
    title: {
        paddingTop: theme.spacing(2),
        textAlign: 'center',
    },
}))

const UnitChart = ({ month, transactions, units }) => {
    const classes = useStyles()
    const theme = useTheme()

    let dataPoints = []

    if (transactions && units) {
        dataPoints = transactions
            .reduce((list, t) => {
                if (t.value >= 0) return list
                const index = list.findIndex(i => i._id === t.unit)
                if (index !== -1) {
                    list[index].y += Math.abs(t.value)
                } else {
                    const unit = units.find(u => u._id === t.unit)
                    if (!unit) return list
                    list.push({
                        _id: unit._id,
                        name: unit.name,
                        label: unit.name,
                        color: theme.palette.primary.main,
                        y: Math.abs(t.value),
                    })
                }
                return list
            }, [])
            .sort((a, b) => a.y > b.y ? 1 : -1)
    }

    const CanvasJSChart = CanvasJSReact.CanvasJSChart
    const options = {
        animationEnabled: true,
        height: 300,
        subtitles: [{
            text: month,
            verticalAlign: 'top',
            fontSize: 20,
        }],
        axisX: {
            labelAngle: -45,
            labelFontSize: 12,
            interval: 1,
        },
        data: [{
            type: 'column',
            dataPoints: dataPoints,
        }]
    }

    return (
        <Paper className={classes.unitChart}>
            <Typography className={classes.title} variant="h4" component="h4">
                Units
            </Typography>
            <CanvasJSChart
                options={options}
            />
        </Paper>
    )
}

export default UnitChart