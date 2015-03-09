'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/user', require('./user.js'));
router.use('/orders', require('./orders.js'));
router.use('/coffee', require('./coffee-route.js'));
router.use('/mints', require('./mint-route.js'));
router.use('/signup', require('./signup.js'));
router.use('/subpay', require('./subpay'));
router.use('/admin', require('./admin.js'));
router.use('/profile', require('./profile.js'));
router.use('/login', require('./login.js'));
router.use('/logout', require('./logout.js'));
router.use('/reviews', require('./reviews.js'))
