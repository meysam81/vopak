const moment = require('moment');

logger = (req, res, next) => {
  console.log(moment().format(), req.ip, req.protocol, req.method,
    req.originalUrl, res.statusCode);
  next();
};


module.exports = {
  logger: logger,
};
