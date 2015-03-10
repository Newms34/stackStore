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
    console.log('user name:', ordersToDb.user)
    mongoose.model('User').find({
        email: ordersToDb.user
    }, function(err, usr) {
        if (usr !== null) {
            ordersToDb.user = usr[0]._id;
            console.log('ordersToDb',ordersToDb)
            mongoose.model('Order').create(ordersToDb,function(err,theOrd){
                res.send(theOrd._id)
            });
            // var newOrder = mongoose.model('Order');
            // mongoose
            
        } else {
            res.send('No User');
        }
    })
});

router.post('/payOrder', function(req, res, next) {
    var ordId = req.body.id;
    console.log('ordId: ', ordId)
    var promoted = req.body.prom;
    mongoose.model('Order').findById(ordId, function(err, theOrder) {
        theOrder.status='paid';
        if (promoted!=0){
            theOrder.promoted=true;
        }
        console.log(theOrder);
        theOrder.save()
        res.send('Done');
    })
})