'use strict';
var router = require('express').Router();

var stripe = require("stripe")(
    "sk_test_WhzuBvvju6AKl7KyIKtdWiQf"
);


module.exports = router;

router.post('/', function(req, res, next) {
   
    
    var total = parseInt(req.body.card.total);
    var sourceObj = {
        object: 'card',
        number: req.body.card.num,
        exp_month: parseInt(req.body.card.expmo),
        exp_year:parseInt(req.body.card.expyr),
        cvc: parseInt(req.body.card.cvv),
        name : req.body.card.name
    };
    stripe.charges.create({
        amount: total,
        currency: "usd",
        source: sourceObj,
        description: "charge from store"
    }, function(err, charge) {
        res.send('Charged!');
    });

});