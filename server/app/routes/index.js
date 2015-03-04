'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/user', require('./user'));
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));
router.use('/signup', require('./signup'));
