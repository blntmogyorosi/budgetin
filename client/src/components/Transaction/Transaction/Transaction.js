import React from 'react'
import moment from 'moment'
import clsx from 'clsx'
import { Icon, makeStyles } from '@material-ui/core'

import Value from '../../Value/Value'
import { connect } from 'react-redux'


const useStyles = makeStyles(theme => ({
    transaction: {

    },
    clickable: {
        transition: 'background-color 0.25s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
        },
    },
    transactionPerformedOn: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.grey[900],
        fontSize: theme.spacing(2),
        fontWeight: 700,
        textAlign: 'center',
    },
    transactionBadge: {
        display: 'flex',
        flexFlow: 'nowrap row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
    transactionIcon: {
        flex: '0 1 auto',
        '& > span': {
            fontSize: theme.spacing(4),
        },
    },
    transactionInfo: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'nowrap column',
        justifyContent: 'center',
        alignContent: 'flex-start',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        textAlign: 'left',
    },
    transactionCategory: {
        fontSize: theme.spacing(2.5),
        fontWeight: 700,
    },
    transactionUnit: {
        marginTop: theme.spacing(0.5),
        color: theme.palette.grey[500],
        fontSize: theme.spacing(1.5),
    },
    transactionValue: {
        flex: '0 1 auto',
    }
}))

const Transaction = ({ transaction, onClick, single, categories, units }) => {
    const classes = useStyles()

    const category = categories.find(c => c._id === transaction.category)
    const unit = units.find(u => u._id === transaction.unit)

    return (
        <div className={clsx(classes.transaction, {
            [classes.clickable]: onClick,
        })}>
            {single &&
                <div className={classes.transactionPerformedOn}>
                    {moment(transaction.performedOn).format("MMMM DD, YYYY")}
                </div>
            }
            <div className={classes.transactionBadge} onClick={onClick}>
                <div className={classes.transactionIcon} style={{ color: category.color }}>
                    <Icon>
                        {category.icon}
                    </Icon>
                </div>
                <div className={classes.transactionInfo}>
                    <span className={classes.transactionCategory} style={{ color: category.color }}>{category.name}</span>
                    <span className={classes.transactionUnit}>{unit.name}</span>
                </div>
                <Value value={transaction.value} />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    categories: state.categories.list,
    units: state.units.list,
})

export default connect(mapStateToProps, {})(Transaction)