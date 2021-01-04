const { Schema, model } = require('mongoose');


const AccountSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sharedWith: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: [],
    }],
    name: {
        type: String,
        required: true,
        trim: true,
    },
    currency: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false, timestamps: false });

AccountSchema.statics = {
    /**
     * @description 
     * @param {String} email 
     * @param {String} password 
     * @param {String} password2 
     */
    validateCreate: function (user, name, currency) {
        const errors = {}

        if (!user) errors.user = 'The user field is required!';
        if (!name) errors.name = 'The name field is required!';
        if (!currency) errors.currency = 'The currency field is required!';

        return this
            .findOne({ owner: user, name })
            .then(account => {
                if (account) errors.email = 'This name is already in use! Please select another one!';
                if (Object.keys(errors).length > 0) throw errors;
                else return new this({ owner: user, name, currency });
            });
    },
}

module.exports = Account = model('Account', AccountSchema);