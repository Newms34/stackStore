'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

router.post('/adminUser', function(req, res, next) {
    console.log('getting user')
    var userToAdmin = req.body.email;
    console.log(userToAdmin);
    res.send('yo')
    mongoose.model('User').findOne({
        email: userToAdmin
    }, function(err, usr) {
        if (err) return next(err);
        //adminify!
        if (usr !== null) {
            usr.isAdmin = true;
            usr.save(
                res.send('Adminified!')
            );
        }
    });
});

router.get('/allUsers', function(req, res, next) {
    mongoose.model('User').find({}, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});