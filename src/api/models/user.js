const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  profilePic: {
    type: String
  },
  accountStatus: {
    type: String,
    uppercase: true
  },
  brandName: {
    type: String
  },
  storeDescription: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;