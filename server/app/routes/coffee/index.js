'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;

router.get('/', function (req, res) {
  mongoose.model('Product').find({ isCoffee: true }, function (err, coffee) {
    console.log('hi')
    if (err) return next(err);
    res.json(coffee);
  });
});
