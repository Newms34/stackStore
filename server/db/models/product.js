'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }, // must be cents
  isCoffee: {
    type: Boolean,
    required: true
  },
  category: {
    type: [String],
    required: true
  },
  photo: {
    type: String,
    default: 'http://bayfieldcoffeecompany.com/wp-content/uploads/2013/11/coffee1.jpeg'
  }
});


schema.pre('save', function(next) {
  next();
});

mongoose.model('Product', schema);
