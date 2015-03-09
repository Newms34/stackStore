var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    product = require('./product.js').schema;

var mintSchema = product.extend({isCoffee: {type: Boolean, default: false}});

mongoose.model('Mint', mintSchema);
