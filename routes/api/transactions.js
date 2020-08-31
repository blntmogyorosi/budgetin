const { Router } = require('express');
const passport = require('passport');

const Transaction = require('../../models/Transaction');
const { getTransactions, getTransaction } = require('../../utils/transactions');
const Product = require('../../models/Product');


const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    getTransactions(req.user._id, '2020-08-01')
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json(err));
});

router.get('/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.params;
    const { _id: user } = req.user;

    getTransaction(user, _id)
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json(err));

    // let fullTransaction;

    // Transaction
    //     .findOne({ _id, user })
    //     .then(transaction => {
    //         if (!transaction) throw { _id: `No transaction found with id '${_id}'!` };
    //         fullTransaction = transaction.toJSON();
    //         return Product
    //             .find({ transaction: _id })
    //             .then(productList => { fullTransaction.productList = productList; return fullTransaction; });
    //     })
    //     .then(transaction => res.json(transaction))
    //     .catch(err => res.status(400).json(err));
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { category, unit, performedOn, productList } = req.body;
    const { _id } = req.user;

    let fullTransaction;

    Transaction
        .validateCreate(_id, category, unit, performedOn, productList)
        .then(transaction => transaction.save())
        .then(transaction => { fullTransaction = transaction.toJSON(); return transaction.saveProductList(productList); })
        .then(productList => { fullTransaction.productList = productList; return res.json(fullTransaction); })
        .catch(err => console.log(err));
});

module.exports = router;