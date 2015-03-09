'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

router.post('/', function (req, res, next) {
  console.log("hello");
});
