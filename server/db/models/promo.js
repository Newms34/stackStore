// promo.js
'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	code:String,
	creationDate:String,
	expireDate:String,
	promotionOn:String,
	pricePerc:Number
});


mongoose.model('Promo', schema);
