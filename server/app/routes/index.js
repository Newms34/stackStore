'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/user', require('./user'));

router.use('/mint', require('./mint'));
// router.use('/coffee', require('./coffee'));
// router.use('/help', require('./help'));
// router.use('/stackStoreRoutes', require('./stackStoreRoutes'));


