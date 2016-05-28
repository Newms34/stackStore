'use strict';
var Q = require('q');
var path = require('path');
var chalk = require('chalk');

// var DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;
var DATABASE_URI = 'mongodb://heroku_app34344585:kf2j6lu0q0n479f5gnu87l2db0@ds029787.mlab.com:29787/heroku_app34344585';

var mongoose = require('mongoose');
var db = mongoose.connect(DATABASE_URI).connection;

// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
require('./models/user');
require('./models/order');
require('./models/reviews');
require('./models/product');
require('./models/coffee');
require('./models/mint');
require('./models/promo');

var startDbPromise = new Q(function (resolve, reject) {
    db.on('open', resolve);
    db.on('error', reject);
});

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
startDbPromise.then(function () {
    console.log(chalk.green('MongoDB connection opened!'));
});

module.exports = startDbPromise;
