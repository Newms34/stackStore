'use strict';
var router = require('express').Router();
module.exports = router;

router.post('/', function(req,res,next){
	console.log(req.body.card)
	res.send('Done!')
})