'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

router.post('/adminUser', function(req, res, next) {
    var userToAdmin = req.body.email
    mongoose.model('User').findOne({
        email: email
    }, function(err, usr) {
        if (err) return next(err);
        //search for user to see if this user already exists
        if (usr == null) {
            var newUser = new mongoose.model('User')({
                'email': email,
                'password': password,
                'twitter': twitter,
                'facebook': facebook,
                'google': google
            });
            newUser.save(
                mongoose.model('User').findOne({
                    email: email
                }, function(err, doneUsr) {
                    res.redirect('/api/user/:email');
                })
            );
        }
    });
});