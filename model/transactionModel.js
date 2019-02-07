const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema({
  txnId: { type: String, required: true, unique: true },
  type: String,
  coinCode: String,
  userUid:{type:mongoose.Types.ObjectId},
  txnType:{type:String},
  time: { type: Number, default: new Date().getTime() },
  date: { type: Date, default: new Date() },
  details: {
    crypto: {
      userWalletId: mongoose.Types.ObjectId,
      coinQuantity: Number,
      coinMarketPrice: Number,
      commission: Number,
      commissionUnit: String,
      isCredit: Boolean,
      credit: Number,
      txnSource: String,
      gasFees: Number
    },
    fiat: {
      isCredit: Boolean,
      credit: Number,
      debit: Number,
      fiatValue: Number,
      fiatUnit: String,
      txnSource: String
    }
  }
});

const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = { transactionModel };
