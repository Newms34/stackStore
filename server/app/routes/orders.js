'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

router.post('/view', function(req, res) {
    //get an order's info

});

router.post('/submit', function(req, res, next) {
    //record an order.
    var ordersToDb = req.body.ordersObj;
    console.log('user name:',ordersToDb.user)
    mongoose.model('User').find({email:ordersToDb.user},function(err,usr){
        if (usr!==null){
            ordersToDb.user = usr[0]._id;
            ordersToDb.date = new Date().toString();
            console.log(ordersToDb)
            res.send('ordersToDb: ',ordersToDb)
            mongoose.model('Order').create(ordersToDb);
        }
        else{
            res.send('No User');
        }
    })
});
