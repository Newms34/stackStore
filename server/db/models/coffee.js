var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    product = require('./product.js').schema;

var coffeeSchema = product.extend({});

mongoose.model('Coffee', coffeeSchema);
