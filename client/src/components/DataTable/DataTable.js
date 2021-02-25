import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core'



const DataTable = ({ id, columns, rows }) => {

    const MyTableHead = () => {
        return (
            <TableHead>
                <TableRow>
                    {columns.map(column => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                        >
                            <TableSortLabel>
                                {column.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }

    const MyTableBody = () => {
        return (
            <TableBody>
                {rows.map((row, index) => (
                    <TableRow key={`${id}__${index}`}>
                        {columns.map(column => (
                            <TableCell
                                key={`${id}__${index}__${column.id}`}
                                align={column.align}
                            >
                                {row[column.id]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    return (
        <TableContainer>
            <Table>
                <MyTableHead />
                <MyTableBody />
            </Table>
        </TableContainer>
    )
}

export default DataTable