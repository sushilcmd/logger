const func = require("../commonFile/common");
const userModel = require("../model/signUp");
const deviceModel = require("../model/devicesLogin");
const mongoose = require('mongoose');
const saveData = (req, res) => {
  const { body } = req;
  if (!body.name || !body.email) {
    return res.send("parameter missing");
  } else {
    res.status(200).send({ responceMessage: "successfully" });
  }
};
const signUp = (req, res) => {
  if (!req.body.name || !req.body.mobile || !req.body.password)
    return func.responseHandler(res, 400, "Error: Parameters missing");
  try {
    // func.jwt(req.body.deviceToken, (errJwt, resultJwt) => {
    func.bcrypt(req.body.password, (errBcr, resultBcr) => {
      var obj = {
        name: req.body.name,
        mobile: req.body.mobile,
        password: resultBcr
      };
      userModel.findOne({ mobile: req.body.mobile }, (err, result) => {
      if (result)
          return func.responseHandler(res, 405, "MobileNumber Already Exist.");
        else if (!result) {
          new userModel(obj).save((err, finalResult) => {
            // let obj1 = { userUid: finalResult._id };
            // deviceModel.create(obj1);
            userModel.findById(
              { _id: finalResult._id },
              { password: 0 },
              (err, response) => {
                return func.responseHandler(
                  res,
                  200,
                  "Successfully SigUp.",
                  response
                );
              }
            );
          });
        }
      });
    });
    // })
  } catch (e) {
    // console.log(e)
    return func.responseHandler(res, 400, "Internal Server Error.", e);
  }
};
const signIn = (req, res) => {
  if (!req.body.userUid || !req.body.password)
    return func.responseHandler(res, 401, "Parameter Missing.");
    userModel
    .findOne({ _id: req.body.userUid })
    .then(data => {
      if (!data) return func.responseHandler(res, 404, "Invalid Credentials.");
      if (data) {
        func.jwt(req.body.userUid,(errJwt, resultJwt) => {
          if (errJwt) throw errJwt;
          else {
            func
              .bcryptVerify(req.body.password, data.password)
              .then(data => {
                if (data == false)
                  return func.responseHandler(res, 400, "Invalid Password.");
                else if (data == true) {
                
                  deviceModel
                    .findOne({ userUid: req.body.userUid })
                    .then(result => {
                      if (result) {
                        let obj1 = {
                          userUid: req.body.userUid,
                          deviceToken: req.body.deviceToken,
                          deviceType: req.body.deviceType,
                          // jwt:resultJwt
                        //   lattitude:req.body.userInformation.lat,
                        //   longitude:req.body.userInformation.long,
                        //  'address.city':req.body.userInformation.city
                        };
                        deviceModel
                          .create(obj1)
                          .then(data => {
                            return func.responseHandler(
                              res,
                              200,
                              "Success.",
                              data
                            );
                          })
                          .catch(err => {
                            console.log("Error to update data at login", err);
                          });
                      }
                      if (!result) {
                        let obj1 = {
                          userUid: req.body.userUid,
                          deviceToken: req.body.deviceToken,
                          deviceType: req.body.deviceType,
                          // jwt:resultJwt
                        //   lattitude:req.body.userInformation.lat,
                        //   longitude:req.body.userInformation.long,
                        //  'address.city':req.body.userInformation.city
                        };
                        deviceModel
                          .create(obj1)
                          .then(data => {
                            return func.responseHandler(
                              res,
                              200,
                              "Success.",
                              data
                            );
                          })
                          .catch(err => {
                            console.log("Error to update data at login", err);
                          });
                      }
                    });
                }
              })
              .catch(err => {
                return func.responseHandler(
                  res,
                  400,
                  "Internal Server Error.",
                  err
                );
              });
          }
        });
      }
    })
    .catch(err => {
      return func.responseHandler(res, 400, "Internal Server Error.", err);
    });
};
const logOut = (req, res) => {
  if (!req.body.userUid || !req.body.deviceToken)
    return func.responseHandler(res, 401, "Parameter Missing.");
  deviceModel
    .findOneAndRemove(
      { userUid: mongoose.Types.ObjectId(req.body.userUid), deviceToken: req.body.deviceToken })
     .then(data => {
      return func.responseHandler(res, 200, "Successfully LogOut.", data);
    })
    .catch(err => {
      return func.responseHandler(res, 400, "Internal Server Error.", err);
    });
};

module.exports = { saveData, signIn, logOut, signUp };

// const value={ $or: [{ $and: [{ mobile:req.body.mobile,password:req.body.password,deviceToken:req.body.deviceToken}] },{ $and: [{ mobile:req.body.mobile,password:req.body.password,ip:req.body.ip}] }] }
// { $set: { "jwt.$.deviceToken": " ", "jwt.$.jwt": " ","jwt.$.deviceType":" " } }

