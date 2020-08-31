const { Router } = require('express');
const passport = require('passport');

const Category = require('../../models/Category');


const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Category
        .aggregate([
            {
                "$match": {
                    "user": req.user._id
                }
            },
            {
                "$lookup": {
                    "from": "transactions",
                    "localField": "_id",
                    "foreignField": "category",
                    "as": "transactions",
                }
            },
            {
                "$project": {
                    "_id": "$_id",
                    "type": "$type",
                    "icon": "$icon",
                    "name": "$name",
                    "color": "$color",
                    "transactionsCount": { "$size": "$transactions" },
                    "transactionsSum": { "$abs": { "$sum": "$transactions.value" } }
                },
            },
            {
                "$sort": {
                    "transactionsCount": -1,
                    "transactionsSum": -1,
                    "name": 1,
                },
            },
        ])
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { name, icon, color, type } = req.body;
    const { _id } = req.user;

    Category
        .validateCreate(name, icon, color, type, _id)
        .then(category => category.save())
        .then(category => res.json(category))
        .catch(err => res.status(400).json(err));
});

module.exports = router;