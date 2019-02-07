const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
roleId: mongoose.Schema.Types.ObjectId,
roleName: String,
access: [],
createdAt: { type: Number, default: new Date().getTime() },
createdBy: String
})

const rolesModel = mongoose.model('role', rolesSchema)

module.exports = { rolesModel }