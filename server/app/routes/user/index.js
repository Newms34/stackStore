'use strict';
var router = require('express').Router();
module.exports = router;

router.get('/newUser', function(req,res){
  console.log('hi');
	res.send('Go away.')
});
