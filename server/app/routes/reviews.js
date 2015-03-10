'use strict';
var router = require('express').Router(),
  mongoose = require('mongoose');

module.exports = router;

router.post('/', function(req, res, next) {
  console.log('hello')
  console.log(req.body)

  mongoose.model('Review').create({
    'review': req.body.review,
    'product': req.body.product,
    'user': req.body.user,
    'stars': req.body.stars
  }, function(err, data){
    if (err) return next(err)
    res.json(data);
  });
});

router.get('/mint/:id', function(req, res, next) {

  mongoose.model('Review').find({
    product: req.params.id
  }, function(err, reviews) {
    if (err) return next(err);
    else res.json(reviews);
  });
});

router.get('/coffee/:id', function(req, res, next) {
 
  mongoose.model('Review').find({
     product: req.params.id
  }, function(err, reviews) {
    if (err) return next(err);
    else res.json(reviews);
  });
});




