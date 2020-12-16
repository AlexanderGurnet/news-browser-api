const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const celebrateErrorHandler = require('celebrate').errors();
const rateLimit = require('express-rate-limit');

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralErrorHandler = require('./middlewares/central-error-handler');
const {
  rateLimitConfig,
  bodyParserConfig,
  dbLink,
  dbConfig,
  port,
} = require('./configuration/config');

const app = express();

mongoose.connect(dbLink, dbConfig);

app.use(helmet());
app.use(requestLogger);
app.use(rateLimit(rateLimitConfig));

app.use(cookieParser());
app.use(bodyParser.json(bodyParserConfig));

app.use(router);
app.use(errorLogger);

app.use(celebrateErrorHandler);
app.use(centralErrorHandler);

app.listen(port);
