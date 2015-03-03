'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
// var Product = require()

var schema = new mongoose.Schema({
    // user reference should be object id http://mongoosejs.com/docs/api.html#schema-objectid-js
    user:{type:ObjectId, default: 'none'},
    products:[{
    	prodId:ObjectId,
    	Price:Number,
    	Quantity:Number
    }],
    status:String
});


schema.pre('save', function(next) {
    var ord = this;
    if (ord.user!=='none' ){
        //save in user's order history
    }
    next();
});


mongoose.model('Order', schema);

//change user, session to strings, default 'none', check to make sure both are not none
