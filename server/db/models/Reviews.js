// Reviews.js

'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');
var models = require('./');

var schema = new mongoose.Schema({
    review: {type: String, 
    		minLength: 20
    },
    product: {
    	type: String
    },
    user: {
    	type: String
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.


schema.pre('save', function (next) {
    var review = this;
    models.Users.findOne({email: review.user}, function (user){
    	models.Product.findOne({title: review.product}, function(product){
    		if (product !== null && user !== null){
    			next();
    		} else {
                console.log ('YOU DUN GOOFED')
    			res.sendFile('err');
    		}
    	})
    });
});


mongoose.model('Review', schema);