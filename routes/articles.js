const articlesRouter = require('express').Router();

const auth = require('../middlewares/auth');
const { checkArticleId, checkArticleInputData } = require('../modules/celebrate-validation-module');
const { createArticle, getArticles, deleteArticleById } = require('../controllers/articles');

articlesRouter.get('/', auth, getArticles);
articlesRouter.post('/', auth, checkArticleInputData, createArticle);
articlesRouter.delete('/:articleId', auth, checkArticleId, deleteArticleById);

module.exports = articlesRouter;
