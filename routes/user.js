const Router = require("express").Router();
const {saveData,signIn, logOut, signUp} = require("../webService/user");
const {getData}=require("../webService/dataApi")
Router.post("/saveData", saveData);
Router.post("/signIn", signIn);
Router.post('/signUp',signUp)
Router.post('/logOut',logOut)
Router.post('/getData',getData)
module.exports = { userRoutes: Router };
