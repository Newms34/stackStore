'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/user', require('./user'));
router.use('/orders', require('./orders'));
router.use('/coffee', require('./coffee-route'));
router.use('/mints', require('./mint-route'));
router.use('/signup', require('./signup'));
