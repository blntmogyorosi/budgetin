const jwt = require('jsonwebtoken');


module.exports = {
    generateJWT: ({ _id, email, registered }) => {
        return 'Bearer ' + jwt.sign(
            { _id, email, registered },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 3600 });
    }
};