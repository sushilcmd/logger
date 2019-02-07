const mongoose = require('mongoose');
var Schema = mongoose.Schema;
let SignUp = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    password: { type: String },

}, { timestamps: true })

module.exports = mongoose.model('signUp', SignUp, 'signUp');