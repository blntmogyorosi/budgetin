import React from 'react'
import DoughnutChart from '../Chart/DoughnutChart'
import { Doughnut } from 'react-chartjs-2'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    chartContainer: {
        width: '100%',
        overflow: 'hidden'
    }
}))

const CategoryChart = ({ month, categories }) => {
    const classes = useStyles()

    return (
        <Paper className={classes.chartContainer}>
            <DoughnutChart
                title={month}
                data={categories.sort((prev, next) => next.y - prev.y)}
            />
        </Paper>
    )
}

export default CategoryChart