const { Router } = require('express');
const Account = require('../../models/Account');

const User = require('../../models/User');


const router = Router();

router.post('/register', (req, res) => {
    const { email, password, password2 } = req.body;
    let newUser
    User
        .validateRegister(email, password, password2)
        .then(user => user.save())
        .then(user => { newUser = user; console.log(user); return Account.validateCreate(user._id, 'Main', 'HUF'); })
        .then(account => { console.log(account); return account.save() })
        .then(account => res.json({ email: newUser.email }))
        .catch(err => res.status(400).json(err));
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User
        .validateLogin(email, password)
        .then(token => res.json(token))
        .catch(err => res.status(400).json(err));
});

module.exports = router;