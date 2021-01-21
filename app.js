const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
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

const whitelist = ['http://localhost:8080', 'http://localhost:3000', 'https://news-browser.students.nomoreparties.space', 'https://www.news-browser.students.nomoreparties.space'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: 'Content-Type',
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

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
