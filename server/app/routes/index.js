'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/user', require('./user'));
router.use('/orders', require('./orders'));
router.use('/coffee', require('./coffee'));
router.use('/mints', require('./mints'));
router.use('/signup', require('./signup'));
