var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    CustId: Number,
    CustName: String,
    CustEmail: String,
    CustPhone: String,
    PlateNum: String
});

module.exports = customerSchema;