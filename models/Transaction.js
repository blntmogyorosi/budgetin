const { Schema, model } = require('mongoose');

const Category = require('./Category');
const Unit = require('./Unit');
const ProductSchema = require('./Product');


const TransactionSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'Unit',
    },
    performedOn: {
        type: Date, // Date; Format: YYYY-MM-DD
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    productList: [{
        type: ProductSchema,
        default: [],
    }],
}, { versionKey: false, timestamps: false });

TransactionSchema.statics = {
    validateCreate: function (account, category, unit, performedOn, productList) {
        return new Promise(async (resolve, reject) => {
            const errors = {}
            let categoryObj, unitObj;
            try {
                categoryObj = await Category.findById(category);
                unitObj = await Unit.findById(unit);
            } catch (err) {
                return reject(err);
            }

            if (!categoryObj && !errors.category) errors.category = `Category with id '${category}' does not exist!`;
            if (!unitObj && !errors.unit) errors.unit = `Unit with id '${unit}' does not exist!`;

            if (Object.keys(errors).length > 0) {
                return reject(errors);
            } else {
                const multiplier = categoryObj.type === 'INCOME' ? 1 : -1;
                return resolve(
                    this({
                        account, category, unit, performedOn,
                        value: productList.reduce((sum, p) => Number(sum) + Math.abs(Number(p.value)), 0) * multiplier,
                        productList: productList
                            .filter(p => p.value)
                            .reduce((list, p) => {
                                for (let i = 0; i < list.length; i++) {
                                    if (list[i].name === p.name) {
                                        list[i].value += (Math.abs(p.value) * multiplier);
                                        return list;
                                    }
                                }
                                list.push({ name: p.name, value: Math.abs(p.value) * multiplier });
                                return list;
                            }, [])
                    })
                );
            }
        })
    }
}

module.exports = Transaction = model('Transaction', TransactionSchema);