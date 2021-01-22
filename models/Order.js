const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    customer_contact: {
        type: Number,
        required: true
    },
    item_list: {
        type: [String],
        validate: v => Array.isArray(v) && v.length >0
    },
    //found here https://stackoverflow.com/questions/36860342/mongoose-make-array-required
    total_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('orders', OrderSchema);