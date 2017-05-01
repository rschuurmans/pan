var express = require('express');  
var router  = express.Router();
var db      = require('./../helpers/db');

router.get('/', function(req, res, next) { 
	// res.send('e')
	// if(req.cookies && req.cookies.username) {
	// 	res.redirect('/play/group');
	// } else {
		res.render('index/home');
	// }
	// if(req.cookies && req.cookies.deviceId) {
	// 	res.render('index/home')
	// } else {
	// 	db.createUser(function (id) {
	// 		res.cookie('deviceId', id.toString());
	// 		res.redirect('/tutorial')
	// 	})
	// }
});
// router.get('/tutorial', function (req, res, next) {
// 	res.render('index/tutorial');
// })
router.post('/', function (req, res, next) {
	db.createUserDemo(req.body.username, function (user, group) {
		
		res.cookie('username', req.body.username.toString());
		res.redirect('/play/group');
		// res.end('end');
	})
})



module.exports = router;  