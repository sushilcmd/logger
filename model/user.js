const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
userEmailId: { type: String, unique: true },
userUid: mongoose.Schema.Types.ObjectId,
fullName: String,
facebookProfileId: String,
googleProfileId: String,
google2FAuthKey: String,
userPassword: String,
emailToken: String,
otp: Number,
isLogin: Boolean,
mpin: { type: Number, default: null },
userRole: { type: String, default: 'user' },
singleSession: { type: Boolean, default: false },
userCreatedAt: { type: Number, default: new Date().getTime() },
roleId: mongoose.Schema.Types.ObjectId,
loginInfo: {
lastLogin: { type: Number },
authType: Number,
ipAddress: { type: String },
ipLocation: String,
browser: String,
device: String
}
});

const userModel = mongoose.model('user', userSchema);
module.exports = { userModel };