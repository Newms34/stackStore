'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
    review: {
        type: String
    },
    product: {
    	type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    stars: {
    	type: Number
    }
});

schema.pre('save', function(next) {
    var review = this;
    //look up mongoose population
    mongoose.model('Product').findOne({
        title: review.product
    }, function(err, product) {
        if (product !== null) {
            next();
        } else {
            console.log('Hook');
            next();

      	 //do we HAVE an err? I don't think we do
        }
    });
});


mongoose.model('Review', schema);
