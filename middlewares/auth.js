const jwt = require('jsonwebtoken');
const { securityKey } = require('../configuration/config');
const { UNATHORIZED_ERR_MESSAGE } = require('../constants/constants');
const UnathorizedError = require('../errors/UnathorizedError');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new UnathorizedError(UNATHORIZED_ERR_MESSAGE));
  } else {
    let payload;
    try {
      payload = jwt.verify(req.cookies.jwt, securityKey);
    } catch (err) {
      next(new UnathorizedError(UNATHORIZED_ERR_MESSAGE));
    }
    req.user = payload;
    next();
  }
};
