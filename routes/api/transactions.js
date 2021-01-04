const { Router } = require('express');
const passport = require('passport');

const Transaction = require('../../models/Transaction');
const { getTransactions, getTransaction } = require('../../utils/transactions');
const Product = require('../../models/Product');
const Account = require('../../models/Account');


const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Account
        .findOne({ owner: req.user._id })
        .then(account => {
            if (!account) return Promise.reject('No account found!')

            return getTransactions(account._id, '2021-01-01')
                .then(transactions => res.json(transactions))
        })
        .catch(err => res.status(400).json(err));
});

router.get('/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.params;

    Account
        .findOne({ owner: req.user._id })
        .then(account => {
            if (!account) return Promise.reject('No account found!')

            return getTransaction(account._id, _id)
                .then(transaction => res.json(transaction))
        })

        .catch(err => res.status(400).json(err));
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { category, unit, performedOn, productList } = req.body;
    const { _id } = req.user;

    Account
        .findOne({ owner: req.user._id })
        .then(account => {
            if (!account) return Promise.reject('No account found!')

            return Transaction
                .validateCreate(account._id, category, unit, performedOn, productList)
                .then(transaction => transaction.save())
                .then(transaction => res.json(transaction))
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;