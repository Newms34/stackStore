'use strict';
var express = require('express');
var app = express();
module.exports = app;
require('./configure')(app);


app.get('/mint', function(req, res, next){
	mongoose.model('Product').find({isCoffee: false}, function (err, mints){
		if(err) return next(err);
		res.json(mints);
	});
});

