const mongoose = require('mongoose');

const customerSchema = require('./schemas/customerSchema.js');
const postingSchema = require('./schemas/postingSchema.js');
const invoiceSchema = require('./schemas/invoiceSchema.js');

module.exports = function (connectionString) {
    let Customers;
    let Postings;
    let Invoices;

    return {
        connect: function () {
            return new Promise(function (resolve, reject) {
                let db = mongoose.createConnection(connectionString, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });

                db.on('error', (err) => {
                    reject(err);
                });

                db.once('open', () => {
                    Customers = db.model('customers', customerSchema);
                    Invoices = db.model('invoices', invoiceSchema);
                    Postings = db.model('postings', postingSchema);
                    
                    resolve();
                });
            });
        },
        getAllCustomers: function () {
            return new Promise(function (resolve, reject) {
                Customers.find()
                .exec()
                .then(customers => {
                    resolve(customers);
                })
                .catch(err => {
                    reject(err);
                });
            });
        },
        updateCustomerById: function (customerId, customerData) {
            return new Promise(function (resolve, reject) {
                if (Object.keys(customerData).length > 0) {
                    Customers.update({ _id: customerId },
                        {
                            $set: customerData
                        },
                        { multi: false })
                        .exec()
                        .then(() => {
                            resolve(customerId);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    resolve();
                }
            });
        },
        addCustomer: function (customerData) {
            return new Promise(function (resolve, reject) {
                
                // Create a newEmployee from the employeeData
                var newCustomer = new Customers(customerData);

                newCustomer.save((err,addedCustomer) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(addedCustomer._id);
                    }
                });
            });
        },
        getAllPostings: function () {
            return new Promise(function (resolve, reject) {
                Postings.find()
                .exec()
                .then(postings => {
                    resolve(postings);
                })
                .catch(err => {
                    reject(err);
                });
            });
        },
        updatePostingById: function (postingId, postingData) {
            return new Promise(function (resolve, reject) {
                if (Object.keys(postingData).length > 0) { // if there is data to update
                    Postings.update({ PostingId: postingId },
                        {
                            $set: postingData
                        },
                        { multi: false })
                        .exec()
                        .then(() => {
                            resolve(postingId);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    resolve();
                }
            });
        },
        addPosting: function (postingData) {
            return new Promise(function (resolve, reject) {
                
                var newPosting = new Customers(postingData);

                newPosting.save((err,addedPosting) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(addedPosting._id);
                    }
                });
            });
        },
        getAllInvoices: function () {
            return new Promise(function (resolve, reject) {
                Invoices.find()
                .populate('custIdFK')
                .exec()
                .then(invoices => {
                    resolve(invoices);
                })
                .catch(err => {
                    reject(err);
                });
            });
        }

    }
};
