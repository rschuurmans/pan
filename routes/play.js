var express = require('express');  
var app = express();
var router  = express.Router();
var fs      = require('fs');
var modular  = require('../helpers/modular.js');




router.get('/', function(req, res, next) { 
	
	var data = {
		user: JSON.parse(fs.readFileSync('public/data/user.json', 'utf8')),
		header: {
			back: false,
			live: true,
			isLive: JSON.parse(fs.readFileSync('public/data/user.json', 'utf8')).live,
		}
	}
	console.log(data.header);
	data.header.title = 'room: ' + data.user.roomNumber;
	res.render('play/overview', data);
	
});
router.get('/tracker', function (req, res, next) {
	res.render('play/tracker', {})
})
router.get('/module/:id', function (req, res, next) {
	var data = modular.getModule(req.params.id, JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8')).categories);
	data.header = {
		title: data.title,
		back: true,
		backLink: '/play',
		live: true,
		isLive: JSON.parse(fs.readFileSync('public/data/user.json', 'utf8')).live,
	};
	data.value = 'value2';
	
	res.render('play/module', data);
})
router.get('/list/:place', function (req, res, next ) {
	var data = JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8'));

	res.render('play/list', data)
});

// url; ?category=:category&col=:id
router.get('/add', function (req, res, next) {
	var data = modular.getCategory(req.query.category, JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8')).categories);
	if(data) {
		data.location = req.query.col;
		data.header = {
			title: data.category,
			back: true,
			backLink: '/play',
			live: false
		};
		res.render('play/list', data)
	} else {
		res.redirect('/404');
	}
	
})
router.post('/add', function (req, res, next) {

	var user    = JSON.parse(fs.readFileSync('public/data/user.json', 'utf8'));
	
	modular.addModule(user, req.body.col, req.body.moduleId, JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8')).categories)
	
	fs.writeFileSync('public/data/user.json', JSON.stringify(user, null, 2));
	res.send({
		redirectTo: '/play'
	})
	res.end();

})
router.post('/live', function (req, res, next) {
	console.log(req.body);
	var user    = JSON.parse(fs.readFileSync('public/data/user.json', 'utf8'));
	user = modular.setLive(user, req.body.isLive);
	fs.writeFileSync('public/data/user.json', JSON.stringify(user, null, 2));
	res.end();
})
router.post('/remove', function (req, res, next) {
	var user  = JSON.parse(fs.readFileSync('public/data/user.json', 'utf8'));
	
	user.modules = modular.removeModule(user.modules, req.body.col, req.body.category);

	fs.writeFileSync('public/data/user.json', JSON.stringify(user, null, 2));
	res.send({
		redirectTo: '/play'
	})
	res.end();
	


})

module.exports = router;  