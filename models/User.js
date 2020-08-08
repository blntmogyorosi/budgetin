const { Schema, model } = require('mongoose');

const { createHash, compareHash } = require('../utils/bcrypt');
const { generateJWT } = require('../utils/jwt');


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    registered: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false, timestamps: false });

UserSchema.statics = {
    /**
     * @description Validates new register. Returns with the new User, or if any error founds throws the error(s)
     * @param {String} email 
     * @param {String} password 
     * @param {String} password2 
     */
    validateRegister: function (email, password, password2) {
        const errors = {}

        if (!email) errors.email = 'The email field is required!';
        // [TODO]: Email validity check
        if (!password) errors.password = 'The password field is required!';
        // [TODO]: Password difficulty check
        if (password2 !== password) errors.password2 = 'The two passwords must match!';

        return User
            .findOne({ email })
            .then(user => {
                if (user) errors.email = 'This email is already in use! Please select another one!';
                if (Object.keys(errors).length > 0) throw errors;
                else return new this({ email, password: createHash(password) });
            });
    },
    validateLogin: function (email, password) {
        const errors = {}

        return User
            .findOne({ email })
            .then(user => {
                if (!user) errors.email = 'There is no account with this email! Please try again!';
                else if (!compareHash(user.password, password)) errors.password = 'The password for this email is wrong! Please try again!';
                if (Object.keys(errors).length > 0) throw errors;
                else return generateJWT(user);
            });
    }
};

module.exports = User = model('User', UserSchema);