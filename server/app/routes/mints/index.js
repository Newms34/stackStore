'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;

router.get('/', function(req, res, next) {
  mongoose.model('Product').find({isCoffee: false}, function(err, mints) {
    if (err) return next(err);
    res.json(mints);
  });
});
