import React from 'react'
import DoughnutChart from '../Chart/DoughnutChart'


const ProductChart = ({ month, products }) => {
    const categoryType = "EXPENSE"
    // const totalValue = products.reduce(p => Math.abs(p.value))
    return (
        <DoughnutChart
            title="Products"
            text={month} data={products.filter(p => categoryType === "EXPENSE" ? p.totalValue < 0 : p.totalValue > 0).map(p => ({ name: p.name, y: Math.abs(p.totalValue) }))}
        />
    )
}

export default ProductChart