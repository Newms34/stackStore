'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user:Boolean,
    session:Boolean,
    status:String,
    Paid:Boolean
});


schema.pre('save', function(next) {
    var ord = this;
    if (ord.user || ord.session){
        next();
    }
});

mongoose.model('Order', schema);

