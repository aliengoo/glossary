"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EntrySchema = new Schema({

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    required: true,
    default: Date.now
  },

  version: {
    type: String,
    required: true,
    default: 1
  },

  isLatest: {
    type: Boolean,
    required: true
  },

  createdBy: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Entry', EntrySchema);
