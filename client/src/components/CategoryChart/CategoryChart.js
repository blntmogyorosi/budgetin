import React from 'react'
import CanvasJSReact from '../Chart/canvasjs.react'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    categoryChart: {
        width: '100%',
        overflow: 'hidden'
    },
    title: {
        paddingTop: theme.spacing(2),
        textAlign: 'center',
    },
}))


const CategoryChart = ({ month, categories }) => {
    const classes = useStyles()

    const CanvasJSChart = CanvasJSReact.CanvasJSChart
    const options = {
        animationEnabled: true,
        height: 300,
        subtitles: [{
            text: month,
            verticalAlign: 'center',
            fontSize: 20,
        }],
        data: [{
            type: 'doughnut',
            radius: '80%',
            innerRadius: '75%',
            indexLabelFontSize: 12,
            indexLabel: '{name} - {y}',
            dataPoints: categories,
        }]
    }

    return (
        <Paper className={classes.categoryChart}>
            <Typography className={classes.title} variant="h4" component="h4">
                Categories
            </Typography>
            <CanvasJSChart
                options={options}
            />
        </Paper>
    )
}

export default CategoryChart