const {
  SYNTAX_ERR_MESSAGE,
  SERVERSIDE_ERR_MESSAGE,
} = require('../constants/constants');

const centralErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'SyntaxError') {
    res
      .status(statusCode)
      .send({ message: SYNTAX_ERR_MESSAGE });
  } else {
    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? SERVERSIDE_ERR_MESSAGE
          : message,
      });
  }
  next();
};

module.exports = centralErrorHandler;
