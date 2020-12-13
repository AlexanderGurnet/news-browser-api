const { Joi, celebrate } = require('celebrate');
const { passwordRegExpPattern, urlRegExpPattern } = require('../configuration/config');

const checkSignupInputData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(passwordRegExpPattern),
    name: Joi.string().required().min(2).max(30),
  }),
});

const checkSigninInputData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(passwordRegExpPattern),
  }),
});

const checkArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().required().length(24),
  }),
});

const checkArticleInputData = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(urlRegExpPattern),
    image: Joi.string().required().pattern(urlRegExpPattern),
  }),
});

module.exports = {
  checkSignupInputData,
  checkSigninInputData,
  checkArticleId,
  checkArticleInputData,
};
