const { Schema, model } = require('mongoose');


const UnitSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
}, { versionKey: false, timestamps: false });

UnitSchema.statics = {
    validateCreate: function (name, account) {
        return this
            .find({ account })
            .then(units => {
                const errors = {};
                
                // Required fields
                if (!name || name.trim().length === 0) errors.name = 'Unit name is required!';
                // Name uniqueness check
                if (units.filter(u => u.name === name).length > 0) errors.name = `Unit name '${name}' is used already!`;

                if (Object.keys(errors).length > 0) throw errors;
                else return this({ name, account });
            })
    }
}

module.exports = Unit = model('Unit', UnitSchema);