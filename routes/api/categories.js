const { Router } = require('express');
const passport = require('passport');

const Account = require('../../models/Account');
const Category = require('../../models/Category');


const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Account
        .findOne({ owner: req.user._id })
        .then(account => {
            if (!account) return Promise.reject('No account found!')

            return Category
                .aggregate([
                    {
                        "$match": {
                            "account": account._id,
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
        })
        .catch(err => res.status(400).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { name, icon, color, type } = req.body;
    const { _id } = req.user;

    Account
        .findOne({ owner: _id })
        .then(account => {
            if (!account) return Promise.reject('No account found!')

            return Category
                .validateCreate(name, icon, color, type, account._id)
                .then(category => category.save())
                .then(category => res.json(category))
        })
        .catch(err => { console.log(err); res.status(400).json(err) });
});

module.exports = router;