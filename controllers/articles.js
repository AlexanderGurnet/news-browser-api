const Article = require('../models/article');
const {
  ARTICLE_NOTFOUND_ERR_MESSAGE,
  ARTICLE_BYID_NOTFOUND_ERR_MESSAGE,
  FORBIDDEN_ERR_MESSAGE,
} = require('../constants/constants');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.send(article))
    .catch(next);
};

const getArticles = (req, res, next) => {
  Article
    .find({ owner: req.user._id })
    .select('+owner')
    .orFail(() => new NotFoundError(ARTICLE_NOTFOUND_ERR_MESSAGE))
    .then((articles) => res.send(articles))
    .catch(next);
};

const deleteArticleById = (req, res, next) => {
  const { articleId } = req.params;
  Article
    .findById(articleId)
    .select('+owner')
    .orFail(() => new NotFoundError(ARTICLE_BYID_NOTFOUND_ERR_MESSAGE))
    .then((article) => {
      if (String(article.owner) !== String(req.user._id)) {
        next(new ForbiddenError(FORBIDDEN_ERR_MESSAGE));
      } else {
        Article.deleteOne(article)
          .then(() => res.send(article));
      }
    })
    .catch(next);
};

module.exports = {
  createArticle,
  getArticles,
  deleteArticleById,
};
