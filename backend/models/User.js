const mongoose = require("mongoose");
const Url = require("./Url");

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  otp: {
    type: String,
  },

  otpExpires: {
    type: Date,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "User",
  userSchema
);