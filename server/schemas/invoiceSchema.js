var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoiceSchema = new Schema({
    Total: Number,

    CustIdFK: { type: Schema.Types.ObjectId, ref: 'Customers' },
    PostingIdFK: { type: Schema.Types.ObjectId, ref: 'Postings' },

});

module.exports = invoiceSchema;
