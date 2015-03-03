'use strict';
var router = require('express').Router();
module.exports = router;
router.get('/newUser',function(req,res){
	res.send('Go away.')
})