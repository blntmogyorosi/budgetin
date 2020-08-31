const { Router } = require('express');
const passport = require('passport');

const Product = require('../../models/Product');


const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Product
        .aggregate([
            {
                $lookup: {
                    from: "transactions",
                    localField: "transaction",
                    foreignField: "_id",
                    as: "transaction",
                },
            },
            {
                $project: {
                    name: "$name",
                    transaction: "$transaction",
                },
            },
            // {
            //     $match: {
            //         user: req.user._id
            //     },
            // },
            // {
            //     $project: {
            //         _id: "$_id",
            //         name: "$name",
            //         productCount: { $size: "$transactions" },
            //         transactionsSum: { $abs: { $sum: "$transactions.value" } },
            //     },
            // },
            // {
            //     $sort: {
            //         transactionsCount: -1,
            //         transactionsSum: -1,
            //         name: 1,
            //     },
            // },
        ])
        .then(products => res.json(products))
        .catch(err => res.status(400).json(err));
});

module.exports = router;