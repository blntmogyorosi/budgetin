// The Product is stored in a separate collection
// This is the only solution in SQL languages (since it is a one-to-many)
// In NoSQL languages there's an option to store these on the parent (Transaction), but we may need to query only the products
// This specification may change later

const { Schema, model } = require('mongoose');


const ProductSchema = new Schema({
    transaction: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true,
    },
    name: {
        type: String,
        trim: true,
    },
    value: {
        type: Number,
        required: true,
    },
}, { versionKey: false, timestamps: false });

module.exports = Product = model('Product', ProductSchema);