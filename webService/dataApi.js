const mongoose = require("mongoose");
const { transactionModel } = require("../model/transactionModel");
// const { profitLoseModel } = require("../model/profitLose");

const getData = (req, res) => {
  const { fromDate, toDate, userUid } = req.body;
  const pipeline = [
    {
      $match: {
        userUid: mongoose.Types.ObjectId(userUid),
        coinCode: "waves"
      }
    },
    {
      $project: {
        date: { $dateToString: { format: "%Y%m%d", date: "$date" } },
        crypto: "$details.crypto",
        fiat: "$details.fiat",
        coinCode: 1,
        type: 1
      }
    },
    {
      $group: {
        _id: { date: "$date", type: "$type" },
        date: { $first: "$date" },
        type: { $first: "$type" },
        price: { $avg: "$crypto.coinMarketPrice" },
        coinBalance: { $sum: "$crypto.coinQuantity" }
      }
    },
    {
      $match: {
        $or: [
          {
            date: {
              $gte: "20190117",
              $lte: "20190117"
            }
          }
        ]
      }
    },
    {
      $project: {
        _id: 0,
        date: 1,
        type: 1,
        price: 1,
        coinBalance: 1,
        total: 1,
        moneySpend: { $multiply: ["$price", "$coinBalance"] }
      }
    }
  ];

  transactionModel.aggregate(pipeline).exec((err, data) => {
    let buyCoin = 0;
    let buyWallet = 0;
    let sellCoin = 0;
    let totalCoin = 0;
    let buyMoneySpend = 0;
    let sellMoneySpend = 0;
    let sellWallet = 0;
    if (err) {
      return console.log("Data not found");
    } else {
      data.forEach(x => {
        console.log("check data", x);
        if (x.type == "buy") {
          buyCoin = x.coinBalance;
          buyMoneySpend = x.price * x.coinBalance;
          buyWallet = x.price;
        } else {
          sellCoin = x.coinBalance;
          sellMoneySpend = x.price * x.coinBalance;
          sellWallet = x.price;
        }
        totalCoin = buyCoin - sellCoin;
        let walletValueOfBuy = totalCoin * buyWallet;
        let walletValueOfSell = totalCoin * sellWallet;
        console.log("this is the buy Result", totalCoin, walletValueOfBuy);
        console.log("this is for sell result", totalCoin, walletValueOfSell);
      });
    }
  });
};

module.exports={getData}

// const fdate={$dateToString:{format: "%Y%m%d", fromDate: "$fromDate"}}
// const tdate={$dateToString:{format: "%Y%m%d", toDate: "$toDate"}}
// const fmonth=new Date(fdate).getMonth()+1
// const tmonth=new Date(tdate).getMonth()+1

// /* current Month Format Date and Month *****/ 
// const currentDate=new Date()
// const currentDateFormat={$dateToString:{format:"%Y%m%d", currentDate: "$currentDate"}}
// const currentMonth=new Date(currentDateFormat).getMonth()+1

// if(req.body.fromDate < currentDateFormat || fmonth < currentMonth){
//   //prevoius month Data
//   const profitData=profitModel.create(data)
//   // const profitModel=await Profit.find({userUid:req.body.userUid,month:fmonth})
//    res.status(200).send('git previos months data')
//   }else if (req.body.fDate==currentDateFormat || fmonth== currentMonth){
//    //get currentMonth Data
//    //find previous months Data * current Month Data
//    const profitModel=await Profit.find({userUid:req.body.userUid,month:fmonth-1})

// }else if(req.body.fDate > currentDateFormat || fmonth > currentMonth){
//   // Data found over months
//   res.send('Data not Found')

// }else if(fdate < tdate || fmonth < tmonth){
//   const prfitfDate=await profit.find({userUid:userUid,month:fmonth})

// }