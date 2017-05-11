var express = require('express');  
var router  = express.Router();
// var db      = require('./../helpers/db');

router.get('/', function (req, res, next) {
	res.render('test/index');
})

router.get('/1', function(req, res, next) {
	console.log('getting this');
	// res.end();
	res.render('test/1');
})

// router.get('/', function(req, res, next) { 
// 	if(req.cookies && req.cookies.username) {
// 		res.redirect('/play');
// 	} else {
// 		res.render('index/home');
// 	}
// 	// if(req.cookies && req.cookies.deviceId) {
// 	// 	res.render('index/home')
// 	// } else {
// 	// 	db.createUser(function (id) {
// 	// 		res.cookie('deviceId', id.toString());
// 	// 		res.redirect('/tutorial')
// 	// 	})
// 	// }
// });
// router.get('/tutorial', function (req, res, next) {
// 	res.render('index/tutorial');
// })
// router.post('/', function (req, res, next) {
// 	db.createUserDemo(req.body.username, function (user, group) {
		
// 		if(group) {
// 			res.cookie('username', user.username.toString());
// 			res.redirect('/play');
// 		} else {
// 			res.redirect('/')
// 		}
// 	})
// })



module.exports = router;  