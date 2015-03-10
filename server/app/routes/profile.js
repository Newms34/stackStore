'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;

router.get('/', function(req, res, next) {
	var session = req.session;
	var userID = req.session.passport.user;
	console.log(session);

  mongoose.model('User').find({_id: userID}, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

router.get('/order', function(req, res, next) {
	var session = req.session;
	var userID = req.session.passport.user;
	console.log(session);

  mongoose.model('Order').find({user: userID}, function(err, orders) {
    if (err) return next(err);
    res.json(orders);
  });
});
