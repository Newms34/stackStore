'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;

router.get('/', function (req, res, next){
  var productId = req.body.id;
  mongoose.model('Review').find({product: productId}, function (err, reviews){
    if (err) return next(err);
    res.josn(reviews)
  })
})