
const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
departmentId: { type: mongoose.Schema.Types.ObjectId, auto: true },
departmentName: String,
isActive: { type: Boolean, default: true },
lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
categories: [
{
categoryName: String,
categoryId: { type: mongoose.Types.ObjectId, auto: true },
addedBy: { type: mongoose.Types.ObjectId, default: null },
isdisabled: { type: Boolean, default: false },
categoryCreatedAt: { type: Number, default: new Date().getTime() }
}
],
deletedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
createdBy: { type: mongoose.Schema.Types.ObjectId, default: null },
createdAt: { type: Number, default: new Date().getTime() }
});

const departmentModel = mongoose.model("department", departmentSchema);
module.exports = { departmentModel };