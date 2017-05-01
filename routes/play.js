var express = require('express');  
var app     = express();
var http    = require('http').Server(app);
var router  = express.Router();
var fs      = require('fs');
var modular = require('../helpers/modular.js');
var db      = require('./../helpers/db');
var io      = require('socket.io')(http);


router.get('/', function(req, res, next) { 
	console.log('getting play');
	db.getDemoData(req.cookies.username, function (group, user) {
		
		io.on('connection', function (socket) {
			console.log('connection');
			  socket.emit('startAudio', { activeModules:user.activeModules  });
		});
		res.render('play/overview', {
			header: {
				back: false,
				add:true,
				live: true,
				isLive: false,
				title:'room: ' + group.number
			},
			group: group,
			user: user
		})
	})
});
router.get('/group', function (req, res, next) {
	db.getDemoData(req.cookies.username, function (group, user) {
		console.log(group);
		res.render('play/group',  {
			group:group,
			user:user
		})
	})
})	


router.get('/add', function (req, res, next ) {
	var data =  JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8'));
	data.header = {
			back:true,
			backLink: '/play',
			live:false
		}
	res.render('play/list', data)

})
 
router.post('/add', function (req, res, next ){
	console.log(req.body);
	db.addModule(req.body.module, req.cookies.username, function () {
		res.redirect('/play')
		res.end();
	})
	
})



router.post('/remove', function (req, res, next) {
	db.removeModule(req.body.id, req.cookies.username, function () {
		res.send({
			redirectTo: '/play'
		})

		res.end();
	})
})
router.get('/:title/:id', function (req, res, next) {
	db.getModuleByModuleId(req.cookies.username, req.params.id, function (user, module) {
		var template = 'modules/' + req.params.title;
		res.render('modules/' + req.params.title, {
			user: user,
			module:module
		})
	})
})

// router.get('/module/:id', function (req, res, next) {
// 	db.getModuleByModuleId(req.cookies.username, req.params.id, function (user, module) {
// 		console.log(module.color);
// 		res.render('play/module', {
// 			user: user,
// 			module:module
// 		})
// 	})
// })
// router.post('/add', function (req, res, next) {

// 	var user    = JSON.parse(fs.readFileSync('public/data/user.json', 'utf8'));
	
// 	modular.addModule(user, req.body.col, req.body.moduleId, JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8')).categories)
	
// 	fs.writeFileSync('public/data/user.json', JSON.stringify(user, null, 2));
// 	res.send({
// 		redirectTo: '/play'
// 	})
// 	res.end();

// })
// router.get('/tracker', function (req, res, next) {

// 	res.render('play/tracker', {})
// })

// router.get('/tangible', function (req, res, next) {
// 	res.render('play/tangible', {})
// })

// router.get('/module/:id', function (req, res, next) {
// 	var data = modular.getModule(req.params.id, JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8')).categories);
// 	data.header = {
// 		title: data.title,
// 		back: true,
// 		backLink: '/play',
// 		live: true,
// 		isLive: JSON.parse(fs.readFileSync('public/data/user.json', 'utf8')).live,
// 	};
// 	data.value = 'value2';
	
	
// 	res.render('play/module', data);
// })
// router.get('/list/:place', function (req, res, next ) {
// 	var data = JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8'));

// 	res.render('play/list', data)
// });


// router.post('/add', function (req, res, next) {

// 	var user    = JSON.parse(fs.readFileSync('public/data/user.json', 'utf8'));
	
// 	modular.addModule(user, req.body.col, req.body.moduleId, JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8')).categories)
	
// 	fs.writeFileSync('public/data/user.json', JSON.stringify(user, null, 2));
// 	res.send({
// 		redirectTo: '/play'
// 	})
// 	res.end();

// })
// router.post('/live', function (req, res, next) {
// 	console.log(req.body);
// 	var user    = JSON.parse(fs.readFileSync('public/data/user.json', 'utf8'));
// 	user = modular.setLive(user, req.body.isLive);
// 	fs.writeFileSync('public/data/user.json', JSON.stringify(user, null, 2));
// 	res.end();
// })

module.exports = router;  