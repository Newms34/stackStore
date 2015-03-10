'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;

router.get('/', function(req, res, next) {
  mongoose.model('Coffee').find({}, function(err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/:id', function (req, res, next){
	var coffeeid = req.params.id;
	mongoose.model('Coffee').findOne({_id: coffeeid}, function(err, coffee){
		if (err) return next(err);
		res.json(coffee);
	})
})
