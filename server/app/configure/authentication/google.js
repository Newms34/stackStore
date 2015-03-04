'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        UserModel.findOne({ 'google.id': profile.id }, function (err, user) {
            if (err) return done(err);

            if (user) {
                done(null, user);
            } else {
                console.log("profile, ", profile);
                UserModel.create(
                {
                    google: {
                        id: profile.id,
                        email: profile._json.email
                    }
                }).then(function (user) {
                    done(null, user);
                }, function(err){
                    console.log("err:", err);
                });
            }
        });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            console.log("hello!!!");
            res.redirect('/');
        });

};