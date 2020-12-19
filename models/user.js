const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const {
  WRONG_DATA_UNATHORIZED_ERR_MESSAGE,
} = require('../constants/constants');
const UnathorizedError = require('../errors/UnathorizedError');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
},
{
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnathorizedError(WRONG_DATA_UNATHORIZED_ERR_MESSAGE));
      }
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnathorizedError(WRONG_DATA_UNATHORIZED_ERR_MESSAGE));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
