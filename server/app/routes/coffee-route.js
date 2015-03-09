'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;

router.get('/', function(req, res, next) {
  mongoose.model('Coffee').find({}, function(err, coffee) {
    if (err) return next(err);
    res.json(coffee);
  });
});


router.get('/:id', function(req, res, next) {
	var coffeeId = req.params.id;
  mongoose.model('Coffee').findOne({_id: coffeeId}, function(err, coffee) {
    if (err) return next(err);
    res.json(coffee);
  });
});


