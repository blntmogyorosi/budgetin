const { Schema, model } = require('mongoose');


const CategorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    icon: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ['EXPENSE', 'INCOME'],
        required: true,
    },
}, { versionKey: false, timestamps: false });

CategorySchema.statics = {
    validateCreate: function (name, icon, color, type, user) {
        return this
            .find({ user })
            .then(categories => {
                const errors = {}

                // Required fields
                if (!name || name.trim().length === 0) errors.name = 'Category name is required!';
                if (!icon || icon.trim().length === 0) errors.icon = 'Category icon is required!';
                if (!color || color.trim().length === 0) errors.color = 'Category color is required!';
                if (!type || type.trim().length === 0) errors.type = 'Category type is required!';

                // Name uniqueness check
                if (categories.filter(c => c.name === name).length > 0) errors.name = `Category name '${name}' exists already!`;
                // Icon uniqueness check
                if (categories.filter(c => c.icon === icon).length > 0) errors.icon = `Category icon '${icon}' is already used!`;
                // Color uniqueness check
                if (categories.filter(c => c.color === color).length > 0) errors.color = `Category color '${color}' is in use!`;
                // Type enum (hard coded)
                // TODO: Create stand alone enum for it
                if (!['EXPENSE', 'INCOME'].includes(type)) errors.type = 'Category type must be EXPENSE or INCOME!';

                if (Object.keys(errors).length > 0) throw errors;
                else return this({name, icon, color, type, user });
            })
    }
}

module.exports = Category = model('Category', CategorySchema);