const { Router } = require('express');
const passport = require('passport');

const Unit = require('../../models/Unit');


const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Unit
        .aggregate([
            {
                $match: {
                    user: req.user._id
                },
            },
            {
                $lookup: {
                    from: "transactions",
                    localField: "_id",
                    foreignField: "unit",
                    as: "transactions",
                },
            },
            {
                $project: {
                    _id: "$_id",
                    name: "$name",
                    transactionsCount: { $size: "$transactions" },
                    transactionsSum: { $abs: { $sum: "$transactions.value" } },
                },
            },
            {
                $sort: {
                    transactionsCount: -1,
                    transactionsSum: -1,
                    name: 1,
                },
            },
        ])
        .then(units => res.json(units))
        .catch(err => res.status(400).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { name } = req.body;
    const { _id } = req.user;

    Unit
        .validateCreate(name, _id)
        .then(unit => unit.save())
        .then(unit => res.json(unit))
        .catch(err => res.status(400).json(err));
});

module.exports = router;