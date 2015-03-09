'use strict';
var router = require('express').Router(),
  mongoose = require('mongoose');

module.exports = router;

router.get('/reviews/:id', function(req, res, next) {
  mongoose.model('Review').findOne({
    product: req.params.id
  }, function(err, reviews) {
    if (err) return next(err);
    else res.json(reviews);
  });
});

router.post('/reviews/:id', function(req, res, next) {
  mongoose.model('Review').findOne({
    product: req.params.id
  }, function(err, reviews) {
    mongoose.model('Review').create({
      review: req.body.review,
      product: req.params.id,
      user: req.body.user
    })
  })
})
