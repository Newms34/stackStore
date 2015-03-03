'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

router.get('/getUser', function(req, res) {


router.get('/newUser', function(req, res) {
    res.send('Go away.')
});

router.post('/submit', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.passwords;
    var twitter = {
        id: twitterId,
        username: twitterUn,
        token: twitterToken,
        tokenSecret: twitterTokenSecret
    }
    var facebook = {
        id: fbId
    }
    var google = {
        id: googId
    }
    mongoose.model('User').findOne({
        email: email
    },function(err,usr) {
    	if (err) return next (err);
        //search for user to see if this user already exists
        if (usr == null) {
            var newUser = new mongoose.model('User')({'email': email, 'password': password, 'twitter': twitter, 'facebook': facebook, 'google': google});
            newUser.save(
            	mongoose.model('User').findOne({email:email},function(err,doneUsr){
            			res.redirect('/api/user/:email')
            		})
            	);
        }
    })
})
