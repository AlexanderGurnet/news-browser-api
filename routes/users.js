const usersRouter = require('express').Router();

const auth = require('../middlewares/auth');
const { getUser, signIn, createUser } = require('../controllers/users');
const { checkSignupInputData, checkSigninInputData } = require('../modules/celebrate-validation-module');

usersRouter.post('/signup', checkSignupInputData, createUser);
usersRouter.post('/signin', checkSigninInputData, signIn);
usersRouter.get('/users/me', auth, getUser);

module.exports = usersRouter;
