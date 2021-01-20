require('dotenv').config();

const port = process.env.PORT || 3000;

const securityKey = process.env.NODE_ENV === 'production' ? process.env.JWT_KEY : 'dev-key';

const dbLink = process.env.DB_LINK || 'mongodb://localhost:27017/news-browser-db';

const dbConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const rateLimitConfig = {
  windowMs: 15 * 60 * 1000,
  max: 100,
};

const bodyParserConfig = { type: 'application/json' };

const urlRegExpPattern = new RegExp(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/);

module.exports = {
  rateLimitConfig,
  bodyParserConfig,
  dbLink,
  dbConfig,
  port,
  securityKey,
  urlRegExpPattern,
};
