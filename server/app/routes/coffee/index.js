'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;

router.get('/', function(req, res, next) {
  mongoose.model('Product').find({isCoffee: true}, function(err, coffee) {
    if (err) return next(err);
    res.json(coffee);
  });
});
