const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, printf } = format;
var appRoot = "logFile";


const myFormat = printf(({ message, timestamp, level }) => {
 let time = new Date(timestamp).getTime();
  const obj = {
    time,
    level,
    ...message
  };
  return JSON.stringify(obj);
});
  const infoTransport = new transports.DailyRotateFile({
  json: true,
  colorsize: "green",
  level: "info",
  handleExceptions: true,
  format: myFormat,
  datePattern: "DD-MM-YYYY",
  filename: `${appRoot}/info/info.log`
});
const debugTransport = new transports.Console({
  json: true,
  colorize: true,
  level: "debug",
  filename: `${appRoot}/debug.log`,
  handleExceptions: true,
  maxsize: 5242880,
  maxFiles: 10
});
const errorTransport = new transports.DailyRotateFile({
  json: true,
  colorize: "red",
  filename: `${appRoot}/error/error.log`,
  datePattern: "DD-MM-YYYY",
  level: "error",
  handleExceptions: true,
  format: myFormat
});

const logger = createLogger({
   
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), myFormat),

  transports: [infoTransport, debugTransport, errorTransport],
  exceptionHandlers: [new transports.File({ filename: "exceptions.log" })]
});

module.exports = { logger };
