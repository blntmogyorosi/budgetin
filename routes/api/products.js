const { Router } = require('express');
const passport = require('passport');

const Transaction = require('../../models/Transaction');


const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Transaction
        .aggregate([
            {
                $match: {
                    user: req.user._id,
                },
            },
            {
                $project: {
                    productList: "$productList",
                },
            },
            {
                $unwind: "$productList",
            },
            {
                $group: {
                    _id: "$productList.name",
                    totalValue: { $sum: "$productList.value" },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    totalValue: "$totalValue",
                },
            },
        ])
        .then(products => res.json(products))
        .catch(err => res.status(400).json(err));
});

module.exports = router;