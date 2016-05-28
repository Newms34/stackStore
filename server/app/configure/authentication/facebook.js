'use strict';
// var path = require('path');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function(app) {

  var facebookConfig = {
        "clientID": "375592052644640",
        "clientSecret": "ff9ca279a390ece0b2b5a24bbedc7b97",
        "callbackURL": "http://localhost:1337/auth/facebook/callback"
    };

  var facebookCredentials = {
    clientID: facebookConfig.clientID,
    clientSecret: facebookConfig.clientSecret,
    callbackURL: facebookConfig.callbackURL
  };

  var verifyCallback = function(accessToken, refreshToken, profile, done) {

    UserModel.findOne({
      'facebook.id': profile.id
    }, function(err, user) {
      if (err) return done(err);

      if (user) {
        done(null, user);
      } else {
        console.log("profile: ", profile);
        UserModel.create({
          facebook: {
            id: profile.id
          }
        }).then(function(user) {
          done(null, user);
        });
      }

    });

  };

  passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }),
    function(req, res) {
      res.redirect('/');
    });

};
