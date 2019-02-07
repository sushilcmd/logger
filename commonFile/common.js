var bcrypt = require('bcryptjs')
var saltRounds = 10
var jwt = require('jsonwebtoken');
var config = require('./config.js')


module.exports = {
    responseHandler: (res, responseCode, responseMessage, data) => {
        res.send({ responseCode: responseCode, responseMessage: responseMessage, data: data })
    },

    bcrypt: (divPass, cb) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(divPass, salt, function (err, hashPassword) { cb(null, hashPassword) });
        });
    },

    jwt: (body, cb) => {
        let token = jwt.sign(body, config.jwtSecretKey)
        cb(null, token)
    },

    sms91: (mobile, otp) => {
        return new Promise((resolve, reject) => {
            msg91.send(mobile, otp, (err, response) => {
                if (err) reject(err)
                else resolve(resolve)
            });
        })
    },

    bcryptVerify: (password, dbPassword) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, dbPassword).then(data => {
                resolve(data)
            }).catch(err => {
                console.log("Erorr In bcryptJs")
                reject(err)
            })
        });
    },

}