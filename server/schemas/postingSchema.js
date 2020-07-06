var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postingSchema = new Schema({
    PostingId: Number,
    Title: String,
    Price: Number,
    FromTime: Date,
    ToTime: Date,
    Address: String,
    PostalCode: String,
    Available: Boolean
});

module.exports = postingSchema;
