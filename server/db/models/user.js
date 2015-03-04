'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String,
        email: String
    }
});
schema.plugin(unique);

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function(next) {

    var user = this;
    console.log("hello, ", user);

    if (user.isModified('password')) {
        user.salt = generateSalt();
        user.password = encryptPassword(user.password, user.salt);
    }

    var emailValid = user.google.email.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/);
    if (emailValid !== null) {
        next();
    }

});

schema.method('correctPassword', function(candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);