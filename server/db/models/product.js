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
        default: '/images/placeHolder.jpg'
    }
});

schema.pre('save', function(next) {
    next();
});

module.exports = mongoose.model('Product', schema);
