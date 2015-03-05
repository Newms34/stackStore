'use strict';
var crypto = require('crypto'),
    mongoose = require('mongoose'),
    unique = require('mongoose-unique-validator'),
    extend = require('mongoose-schema-extend');

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

module.exports = mongoose.model('Product', schema);
