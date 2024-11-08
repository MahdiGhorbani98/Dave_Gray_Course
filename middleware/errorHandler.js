/* eslint-disable no-unused-vars */
const { logEvents } = require("./logEvents");
const errorHandler = (err, req, res, next) => {
  console.log("000000000");
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.log("1111111111");

  res.status(500).send(err.message);
  console.log("3333333333333");
};

module.exports = errorHandler;
