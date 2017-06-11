var express = require('express');  
var router  = express.Router();
var db      = require('./../helpers/db');
var app = express();

var io      = require('../socket.js');
var partial = require('express-partial');
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

router.post('/createGroup', function (req, res, next) {
	console.log(req.body);
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
	db.getDemoGroup(function (group) {
		res.render('index/live', group)
	})
})

module.exports = router;  

