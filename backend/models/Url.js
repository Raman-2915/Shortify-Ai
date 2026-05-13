const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({

  fullUrl: {
    type: String,
    required: true,
  },

  shortId: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: "",
  },

  clicks: {
    type: Number,
    default: 0,
  },

  // IMPORTANT
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Url",
  urlSchema
);