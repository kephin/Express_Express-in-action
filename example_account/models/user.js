const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_FACTOR = 10;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  displayname: String,
  bio: String,
});

UserSchema.methods.name = function () {
  return this.displayName || this.username;
};

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, SALT_FACTOR)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => next(err));
});

UserSchema.methods.checkPassword = function (guess, next) {
  const user = this;
  bcrypt.compare(guess, user.password, (err, isMatch) => {
    next(err, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
