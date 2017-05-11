var express = require('express');  
var router  = express.Router();
var db      = require('./../helpers/db');
var io      = require('../socket.js');

router.get('/', function(req, res, next) { 
	res.render('index/home');
	console.log('get/');

});


router.post('/login', function (req, res, next) {
	db.initDemo(req.body.username,res, function (user, group, url) {
		res.redirect(`/role/${user.role}/${group._id}/${user._id}`); 
	})
})

router.get('/demo', function (req, res, next) {
  res.render('demo')
})

router.get('/live', function (req, res, next) {
	// res.send('live')
	db.getDemoGroup(function (group) {
		res.render('index/live', group)
	})
})

module.exports = router;  

