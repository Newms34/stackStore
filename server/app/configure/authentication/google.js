'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var googleConfig ={
        "clientID": "369003002521-88250fc9kjpkfqvhicu7vokbnvu88ud6.apps.googleusercontent.com",
        "clientSecret": "DB1-q81E4ODEuL8cFGCm5QS1",
        "callbackURL": "http://localhost:1337/auth/google/callback"
    };

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
                // console.log("profile, ", profile);
                UserModel.create(
                {
                    email: profile._json.email,
                    google: {
                    id: profile.id,
                    email: profile._json.email
                    }
                }).then(function (user) {
                    done(null, user);
                }, function(err){
                    console.log("err:", err);
                    done(err);
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
            res.redirect('/');
        });

};
