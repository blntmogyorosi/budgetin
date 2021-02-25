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


const CategoryChart = ({ month, transactions, categories }) => {
    const classes = useStyles()

    let dataPoints = []

    if (transactions && categories) {
        dataPoints = transactions
            .reduce((list, t) => {
                if (t.value >= 0) return list
                const index = list.findIndex(i => i._id === t.category)
                if (index !== -1) {
                    list[index].y += Math.abs(t.value)
                } else {
                    const category = categories.find(c => c._id === t.category)
                    list.push({
                        _id: category._id,
                        name: category.name,
                        label: category.name,
                        color: category.color,
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
            verticalAlign: 'center',
            fontSize: 20,
        }],
        data: [{
            type: 'doughnut',
            radius: '80%',
            innerRadius: '75%',
            indexLabelFontSize: 12,
            indexLabel: '{name} - {y}',
            dataPoints: dataPoints,
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