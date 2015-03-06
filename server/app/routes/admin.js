'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

router.post('/adminUser', function(req, res, next) {
    console.log('getting user');
    var userToAdmin = req.body.email;
    console.log(userToAdmin);
    mongoose.model('User').findOne({
        email: userToAdmin
    }, function(err, usr) {
        if (err) return next(err);
        //adminify!
        console.log(usr);
        if (usr !== null) {
            usr.isAdmin = true;
            console.log(usr);
            usr.save();
            res.send('adminified');
        }
    });
});

router.get('/allUsers', function(req, res, next) {
    mongoose.model('User').find({}, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

router.post('/getProds', function(req, res, next) {
    var prod = req.body.theProd;
    console.log(prod);
    mongoose.model(prod).find({}, function(err, prods) {
        if (err) return next(err);
        //adminify!
        if (prods !== null) {
            res.json(prods);
        }
    });
});

router.post('/chkUsr', function(req, res, next) {
    var userToAdmin = req.body.user;
    mongoose.model('User').findOne({
        email: userToAdmin
    }, function(err, usr) {
        if (err) return next(err);
        console.log(usr);
        if (usr !== null && usr.isAdmin) {
            res.send('yes');
        }
        else{
            res.send('no')
        }
    });
});

router.post('/remProd', function(req, res, next) {
    var prod = req.body.theProd;
    var col = req.body.theCat;
    mongoose.model(col).findOneAndRemove({
        title: prod
    }, function(err, prod) {
        if (err) return next(err);
        console.log('What? You don\'t like '+prod+' ?!');
        res.send(prod);
    });
});