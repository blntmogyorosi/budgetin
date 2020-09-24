import React from 'react'
import DoughnutChart from '../Chart/DoughnutChart'


const CategoryChart = ({ month, categories }) => {
    const type = "EXPENSE"
    return (
        <DoughnutChart
            title="Categories"
            text={month} data={categories.filter(c => c.type === type && c.transactoinsSum !== 0).map(c => ({ name: c.name, y: Math.abs(c.transactionsSum) }))}
        />
    )
}

export default CategoryChart