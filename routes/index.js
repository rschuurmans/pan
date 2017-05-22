var express = require('express');  
var router  = express.Router();
var db      = require('./../helpers/db');
var app = express();

var io      = require('../socket.js');
var partial = require('express-partial');
app.use(partial());


router.get('/', function(req, res, next) { 
	console.log('////');
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

router.post('/createGroup', function (req, res, next) {
	// if(req.body.newGroup)
	console.log(req.body.newGroup);
	if(req.body.newGroup) {
		db.createNewGroup(req.body.username, res, function (user, group) {

			res.send({redirect: '/role/sequencer', role: user.role, userId: user._id, groupId: group._id})
		});
	} else {
		db.joinGroup(req.body.username, req.body.id, function (user, group, url) {
			console.log(user, group);
			res.send({redirect: '/role/sequencer', role: user.role, userId: user._id, groupId: group._id})
		});
	}
	// db.createNewGroup(req.body.username, res, function (user, group) {

	// 	res.send({redirect: '/role/sequencer', role: user.role, userId: user._id, groupId: group._id})
	// 	// res.end();
	// 	// res.redirect(200, 'role/sequencer');
		
	// 	// console.log('finished post');
	// 	// var url = '/role/'+user.role+'/'+ group._id + '/' + user._id;
	// 	// console.log(url);
	// 	// res.send(url)
	// 	// res.redirect('/jojo')
	// 	// res.redirect(`/role/${user.role}/${group._id}/${user._id}`); 
	// 	// res.redirect('yo');
	// 	// var url = '/role/'+user.role+'/'+ group._id + '/' + user._id;
	// 	// console.log(url);
	// 	// // res.send({
	// 	// // 	redirectTo: url
	// 	// // })
	// 	// // res.send('/role/'+user.role+'/'+ group.id + '/' + user._id + '');
	// 	// // res.end();
	// 	// res.redirect(301, url)
	// 	// res.end();
	// }) 
})
router.post('/login', function (req, res, next) {
	console.log('post', req.body);
	db.joinGroup(req.body.username, req.body.id, function (user, group, url) {
		// console.log(user);
		res.redirect('/jojo')
	})

	// db.initDemo(req.body.username,res, function (user, group, url) {
	// 	// res.redirect(`/role/${user.role}/${group._id}/${user._id}`); 
	// 	// res.send('ey')
	// 	res.renderPartials({
 //    hello: { data: 'for hello template' },
 //    world: { data: 'for world template' }
 //  });
		// res.render('index/home', {
		// 	title:'no a',
		// 	role:'modulator',
		// 	groupId: group._id,
		// 	userId:user._id,
		// 	username: req.body.username,
		// 	loggedIn: true,
		// 	layout:false
		// })
	// })
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

