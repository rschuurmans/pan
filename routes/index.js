var express    = require('express');  
var router     = express.Router();
var db         = require('./../helpers/db');
var app        = express();

var io         = require('../socket.js');
var partial    = require('express-partial');
var socketLoop = require('../helpers/socketLoop');

app.use(partial());


router.get('/', function(req, res, next) { 
	db.getAllGroups( function (groups) {
		
		res.render('index/home', {
			title:'Pan',
			role:false,
			groupId: false,
			userId:false,
			username: false,
			groups:groups
		});
	})
});

router.get('/demo', function(req, res, next) { 
	res.render('demo');
});
router.get('/demosec', function(req, res, next) { 
	res.render('demosec');
});

router.post('/createGroup', function (req, res, next) {
	
	if(req.body.newGroup == 'true') {
		db.createNewGroup(req.body.username, res, function (user, group) {
			
			res.send({redirect: '/role/sequencer', role: user.role, userId: user._id, groupId: group._id})
		});
	} else {
		db.joinGroup(req.body.username, req.body.id, function (user, group, url) {
			res.send({redirect: '/role/sequencer', role: user.role, userId: user._id, groupId: group._id})
		});
	}
	
})



router.get('/live', function (req, res, next) {
	console.log('start');
	// db.getAllGroups(function (groups) {
	// 	console.log('gotu it');
	// 	res.render('index/live', {
	// 		group:groups[0],
	// 		intervalActive : socketLoop.active
	// 	})
	// })
	res.render('index/live', {
			group:[],
			intervalActive : true
		})
})
router.post('/live', function (req, res, next) {
	console.log('receive post');
	socketLoop.toggle();
	res.send({
		redirect: '/live'
	});
})

module.exports = router;  

