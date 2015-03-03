'use strict';

var router = require('express').Router();
module.exports = router; 

router.get('/noelle', function (req, res){
	res.send('hey there');
});
