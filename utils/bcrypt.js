const bcrypt = require('bcryptjs');


module.exports = {
    createHash: (string) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(string, salt);
            console.log(hash)
            return hash;
        } catch (err) {
            throw err;
        }
    },
    compareHash: (hashed, plain) => {
        try {
            return bcrypt.compareSync(plain, hashed);
        } catch (err) {
            throw err;
        }
    },
};