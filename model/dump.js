const mongoose = require("mongoose");

const dumpSchema = new mongoose.Schema({
empId: mongoose.Schema.Types.ObjectId,
empEmailId: String,
empName: String,
departmentId: { type: mongoose.Schema.Types.ObjectId, default: null },
empRole: { type: String, default: null },
empRoleId: { type: mongoose.Schema.Types.ObjectId, default: null },
empType: String,
});

const dumpModel = mongoose.model("dump", dumpSchema);
module.exports = { dumpModel };