'use strict';
var router = require('express').Router();
module.exports = router;

router.get('/coffee', function (req, res) {
  mongoose.model('Product').find({ isCoffee: true }, function (err, coffee) {
    if (err) return next(err);
    res.json(coffee);
  });
});
