'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user:{type:String, default: 'none'},
    session:{type:String, default: 'none'},
    products:[String],
    status:String,
    Paid:Boolean
});


schema.pre('save', function(next) {
    var ord = this;
    if (ord.user!='none' || ord.session!='none'){
        next();
    }
});

mongoose.model('Order', schema);

//change user, session to strings, default 'none', check to make sure both are not none