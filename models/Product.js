const { Schema } = require('mongoose');


const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    value: {
        type: Number,
        required: true,
    },
}, { versionKey: false, timestamps: false, _id: false });

module.exports = ProductSchema;