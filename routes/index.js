var express = require('express');  
var router  = express.Router();
var db      = require('./../helpers/db');

router.get('/', function(req, res, next) { 
	
	// db.calculateRole();
	res.render('index/home');
});


router.post('/', function (req, res, next) {
	db.initDemo(req.body.username,res, function (user) {
		console.log('user in router',user);
		res.redirect('/role/' + user.role );

		res.end();
	})
})

router.get('/live', function (req, res, next) {
	// res.send('live')
	db.getDemoGroup(function (group) {
		res.render('index/live', group)
	})
})

module.exports = router;  