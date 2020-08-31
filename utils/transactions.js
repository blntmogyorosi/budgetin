const moment = require('moment');

const Transaction = require('../models/Transaction');
const Product = require('../models/Product');


/**
 * @description
 * @param {Date} from From DateTime
 * @param {Date} to To DateTime
 * @returns Promise<List<Transaction>>
 */
const getTransactions = (user, from, to) => {
    return Transaction
        .find({ user, performedOn: { $gte: from, $lte: to || moment().format("YYYY-MM-DD") } })
        .populate(['category', 'unit'])
        .sort({ performedOn: -1, 'category.name': 1 })
        .then(transactions => {
            return transactions.reduce((formattedTransactions, transaction) => {
                const performDate = moment(transaction.performedOn).format("YYYY-MM-DD");
                const formattedTransaction = {
                    _id: transaction._id,
                    category: {
                        name: transaction.category.name,
                        icon: transaction.category.icon,
                        color: transaction.category.color,
                    },
                    unit: transaction.unit.name,
                    value: transaction.value,
                };
                if (!Object.keys(formattedTransactions).includes(performDate))
                    formattedTransactions[performDate] = [ formattedTransaction ]
                else
                    formattedTransactions[performDate].push(formattedTransaction)
                return formattedTransactions;
            }, {});
        });
};

const getTransaction = (user, _id) => {
    return Transaction
        .findOne({ _id, user })
        .populate(['category', 'unit'])
        .then(async transaction => {
            if (!transaction) throw { _id: `No transaction found with id '${_id}'!`};
            const productList = await Product.find({ transaction: _id });
            const fullTransaction = {
                _id: transaction._id,
                category: {
                    _id: transaction.category._id,
                    name: transaction.category.name,
                    icon: transaction.category.icon,
                    color: transaction.category.color,
                },
                unit: {
                    _id: transaction.unit._id,
                    name: transaction.unit.name,
                },
                value: transaction.value,
                performedOn: transaction.performedOn,
            };
            fullTransaction.productList = productList.map(p => ({ _id: p._id, name: p.name, value: p.value }));
            return fullTransaction;
        });
}

module.exports = { getTransactions, getTransaction };