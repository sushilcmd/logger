const { logger } = require("./winston-config");

const logInfo = function(data) {
  logger.info(data, cb);
};
const logError = function(fnName, errorType, errorMsg, req) {
  const formattedData = {
    fnName,
    errorType,
    errorMsg,
    headers: req.headers,
    body: req.body,
    method: req.method,
    url:req.originalUrl
  };
  logger.error(formattedData, cb);
};
const logDebug = function(data) {
  logger.debug(data, cb);
};
const cb = function(err, result) {
  if (!err) {
    return;
  } else {
    return;
    console.log("winston Error");
  }
};
module.exports = { logInfo, logError, logDebug };
