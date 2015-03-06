'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;




router.get('/', function(req, res, next) {
	// var email = sessionStorage.loggedinUser;
	// console.log(sessionStorage.loggedinUser);
  mongoose.model('User').find({}, function(err, coffee) {
    if (err) return next(err);
    res.json(coffee);
  });

});
