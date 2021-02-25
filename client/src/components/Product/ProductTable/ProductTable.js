import React from 'react'
import { makeStyles, Paper } from '@material-ui/core'

import DataTable from '../../DataTable/DataTable'


const useStyles = makeStyles(theme => ({
    productTable: {

    },
}))

const columns = [
    {
        id: 'name',
        label: 'Product Name',
        align: 'left',
    },
    {
        id: 'value',
        label: 'Value',
        align: 'right',
    },
]

const ProductTable = ({ transactions }) => {
    const classes = useStyles()

    const products = transactions
        .reduce((list, t) => {
            for (let product of t.productList) {
                if (product.value >= 0) continue
                const index = list.findIndex(i => i.name === product.name)
                if (index !== -1) {
                    list[index].value += Math.abs(product.value)
                } else {
                    list.push({
                        name: product.name,
                        value: Math.abs(product.value),
                    })
                }
            }
            return list
        }, [])
        .sort((a, b) => a.value < b.value ? 1 : -1)

    return (
        <Paper className={classes.productTable}>
            <DataTable
                columns={columns}
                rows={products}
            />
        </Paper>
    )
}

export default ProductTable