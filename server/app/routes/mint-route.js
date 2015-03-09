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

router.get('/:id', function(req, res, next) {
	var mintId = req.params.id;
  mongoose.model('Mint').findOne({_id: mintId}, function(err, mint) {
    if (err) return next(err);
    res.json(mint);
  });
});