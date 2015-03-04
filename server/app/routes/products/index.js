'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;

router.get('/', function(req, res, next) {
  mongoose.model('Product').find({}, function(err, product) {
    if (err) return next(err);
    res.json(product);
  });
});
