'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: String,
    price: Number,
    coffeeormint: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true
    },
    photo: {
        type: String,
        default: 'pic.jpg'
    }
});


schema.pre('save', function(next) {
    next();
});

mongoose.model('Product', schema);


