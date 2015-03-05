'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;

router.get('/', function(req, res, next) {
  mongoose.model('Mint').find({}, function(err, mints) {
    if (err) return next(err);
    res.json(mints);
  });
});
