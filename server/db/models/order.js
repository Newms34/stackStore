'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');
var Product = require('./product.js');
// var Product = require()
var schema = new Schema({
    // user reference should be object id http://mongoosejs.com/docs/api.html#schema-objectid-js
    user:{type: Schema.Types.ObjectId, ref:'User'},
    products:[{
        prodId:{type: Schema.Types.ObjectId, ref:'Product'},
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