"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    default: Date.now,
    required: true
  },

  token: {
    type: String,
    required: false
  },

  isActive: {
    type: Boolean,
    required: true,
    default: false
  },

  tokenTimestamp: {
    type: Date,
    required: false
  }

});
