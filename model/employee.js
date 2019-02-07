const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
empId: mongoose.Schema.Types.ObjectId,
empEmailId: String,
empPassword: String,
empName: String,
departmentId: { type: mongoose.Schema.Types.ObjectId, default: null },
tickets: [],
empRole: { type: String, default: null },
empRoleId: { type: mongoose.Schema.Types.ObjectId, default: null },
createdAt: { type: Number, default: new Date().getTime() },
createdBy: String,
isDeleted:{type:String,default:false},
isDeletedTime:{type:Date},
empType: String,
});

const employeesModel = mongoose.model("employee", employeesSchema);

module.exports = { employeesModel };