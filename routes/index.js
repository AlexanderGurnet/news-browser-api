const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');

const { RESOURCE_NOTFOUND_ERR_MESSAGE } = require('../constants/constants');
const NotFoundError = require('../errors/NotFoundError');

router.use('/', usersRouter);
router.use('/articles', articlesRouter);
router.all('*', (req, res, next) => next(new NotFoundError(RESOURCE_NOTFOUND_ERR_MESSAGE)));

module.exports = router;
