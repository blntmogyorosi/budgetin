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
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { category, unit, performedOn, productList } = req.body;
    const { _id } = req.user;

    Transaction
        .validateCreate(_id, category, unit, performedOn, productList)
        .then(transaction => transaction.save())
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json(err));
});

module.exports = router;