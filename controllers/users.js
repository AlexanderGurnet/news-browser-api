const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { securityKey } = require('../configuration/config');
const {
  BADREQUEST_ERR_MESSAGE,
  CONFLICT_ERR_MESSAGE,
  USER_NOTFOUND_ERR_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
} = require('../constants/constants');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BADREQUEST_ERR_MESSAGE));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError(CONFLICT_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;

  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        securityKey,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true })
        .send({ message: user.name })
        .end();
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .orFail(() => new NotFoundError(USER_NOTFOUND_ERR_MESSAGE))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUser,
  signIn,
  createUser,
};
