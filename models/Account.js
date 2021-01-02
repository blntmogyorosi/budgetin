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

module.exports = Account = model('Account', AccountSchema);