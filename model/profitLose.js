const mongoose = require("mongoose");
const profitLose = mongoose.Schema(
  {
  
        month:{type:String},
        walletValue: { type: String },
        Assets: String,
        totalCoinQuantity: String,
        profit: { type: String },
        created_at: { type: Date, required: true, default: Date.now }
      
    
  },
  { timestamps: true }
);

const profitLose = mongoose.model("profitLose", profitLose);
module.exports = { profitLose };
