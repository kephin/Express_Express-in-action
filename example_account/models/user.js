const mongoose = require('mongoose');

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

UserSchema.methods.name = () => this.displayname || this.username;

const User = mongoose.model('User', UserSchema);
module.exports = User;
