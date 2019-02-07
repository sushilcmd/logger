const http = require("http");
const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose');
const bodyParse = require("body-parser");
const { userRoutes } = require("./routes/user");
const { IPLogger } = require("./winston/IPLogger");
const requestIp = require('request-ip');
const config = require('./commonFile/config')
const port = process.env.PORT || 9005;
app.use(bodyParse.json());
const db = mongoose.connect(
  config.database,
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

// app.use(IPLogger)
app.use("/save", userRoutes);

const server = http.createServer(app);
server.listen(port, () => {
  console.log("server listening on " + port);
});




