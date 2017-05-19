var express = require('express');  
var router  = express.Router();
var db      = require('./../helpers/db');
var app = express();

var io      = require('../socket.js');
var partial = require('express-partial');
app.use(partial());


router.get('/', function(req, res, next) { 
	res.render('index/home', {
		title:'Pan',
		role:false,
		groupId: false,
		userId:false,
		username: false,
		loggedIn: false,
		layout:'loginLayout'
	});
	

});


router.post('/login', function (req, res, next) {
	console.log('post');
	db.initDemo(req.body.username,res, function (user, group, url) {
		// res.redirect(`/role/${user.role}/${group._id}/${user._id}`); 
		// res.send('ey')
		res.renderPartials({
    hello: { data: 'for hello template' },
    world: { data: 'for world template' }
  });
		// res.render('index/home', {
		// 	title:'no a',
		// 	role:'modulator',
		// 	groupId: group._id,
		// 	userId:user._id,
		// 	username: req.body.username,
		// 	loggedIn: true,
		// 	layout:false
		// })
	})
})

router.get('/demo', function (req, res, next) {
  res.render('demo')
})

router.get('/elements', function (req, res, next) {
  res.render('elements')
})

router.get('/live', function (req, res, next) {
	// res.send('live')
	db.getDemoGroup(function (group) {
		res.render('index/live', group)
	})
})

module.exports = router;  

