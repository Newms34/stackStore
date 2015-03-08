'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

var stripe = require("stripe")("sk_test_WhzuBvvju6AKl7KyIKtdWiQf");

router.post('/payCard', function(req, res, next) {
    var total = parseInt(req.body.total);
    console.log(req.body.token);
    stripe.charges.create({
        amount: req.body.total,
        currency: "usd",
        source: req.body.token,
        description: req.body.manifest
    }, function(err, charge) {
        res.send('Charged! Details: '+charge);
    });

});