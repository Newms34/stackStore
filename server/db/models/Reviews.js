// Reviews.js

'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
    review: {
        type: String,
    	minLength: 20
    },
    product: {
    	type: String
    },
    user: {
    	type: String
    }
});

schema.pre('save', function (next) {
    var review = this;
    mongoose.model('User').findOne({email: review.user}, function (user){
    	mongoose.model('Product').findOne({title: review.product}, function(product){
    		if (product !== null && user !== null){
    			next();
    		} else {
                console.log ('YOU DUN GOOFED');
    			return err.error.type;//do we HAVE an err? I don't think we do
    		}
    	})
    });
});


mongoose.model('Review', schema);
