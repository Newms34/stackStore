'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

router.get('/', function(req, res){
	console.log("hello");
});


router.post('/newUser', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  mongoose.model('User').findOne({email: email}, function (err, user) {
    if (err) return next(err);

    if (user !== null){
    	console.log("You already have an account!");
    	res.redirect('/signup');
    } else {
    	mongoose.model('User').create({'email': email, 'password': password}, function(err, done){
    		if (err) return next(err);
        res.json(user);
    	});
    }
  
  });
});


router.post('/submit', function (req, res, next){

});


