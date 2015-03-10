'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

router.post('/view', function(req, res) {
    //get an order's info
    var usr = req.body.user;
    mongoose.model('Order').find({
        user: usr
    }).exec(function(data) {
        if (data !== null) {
            res.json(data);
        } else {
            res.send('error');
        }
    });

});

router.post('/submit', function(req, res, next) {
    //record an order.
    var user = sessionStorage.loggedinUser;
    var session = req.body.session;
    var products = req.body.products;
    var status = req.body.status;
    var newOrder = new mongoose.model('Order')({
        'user': user,
        'session': session,
        'products': products,
        'status': 'created',
        'Paid': false
    });
    newOrder.save();
    res.redirect('/pay');
});

router.post('/pay', function(req, res, next) {
	res.send('WE NEED A PAYMENT PAGE!');
});
