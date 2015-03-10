'use strict';
var router = require('express').Router(),
    mongoose = require('mongoose');

module.exports = router;

router.get('/:cat', function(req, res, next) {

    var meow = req.params.cat.split('%20').join(' ');
    console.log(meow)
    mongoose.model('Mint').find({}, function(err, mintData) {
        var allItems = [];
        mintData.forEach(function(item) {
            if (item.category.indexOf(meow) != -1) {
                allItems.push(item);
            }
        });
        mongoose.model('Coffee').find({}, function(err, coffData) {
            coffData.forEach(function(item) {
                if (item.category.indexOf(meow) != -1) {
                    allItems.push(item);
                }
            })
            res.send(allItems);
        })
    })

});