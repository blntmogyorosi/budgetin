const { Router } = require('express');

const User = require('../../models/User');


const router = Router();

router.post('/register', (req, res) => {
    const { email, password, password2 } = req.body;
    User
        .validateRegister(email, password, password2)
        .then(user => user.save())
        .then(user => res.json({ email: user.email }))
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