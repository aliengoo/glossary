"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({

  username: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    required: true,
    default: Date.now
  },

  token: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Token", tokenSchema);