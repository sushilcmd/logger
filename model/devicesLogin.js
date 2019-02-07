const mongoose = require('mongoose');
var Schema = mongoose.Schema;
let deviceLogin = mongoose.Schema({
    userUid:{type:mongoose.Types.ObjectId},
    jwt: { type: String },
    deviceToken: { type: String },
    deviceType:{type:String},
    ip:{type:String},
    lattitude:{type:String},
    longitude:{type:String},
    address:[{country:{typr:String},state:{type:String},city:{type:String},pinCode:{type:String}}]
    
  
}, { timestamps: true })

module.exports = mongoose.model('deviceLogin', deviceLogin, 'deviceLogin');