'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

router.get('/', function(req, res){
	console.log("hello");
});


router.post('/users', function (req, res, next) {
  console.log("hello");

  var email = req.body.email;
  var password = req.body.password;

  mongoose.model('User').findOne({email: email}, function (err, user) {
    if (err) return next(err);

    if (user !== null){
    	console.log("login Success");
    	res.json(user);
    } else {

      res.redirect('/signup');
    	
     //  mongoose.model('User').create({'email': email, 'password': password}, function(err, done){
    	// 	if (err) return next(err);
     //    res.json(user);
    	// });
    }
  
  });
});

