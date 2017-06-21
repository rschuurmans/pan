var express = require('express');  
var app     = express();
var server  = require('http').Server(app);
var router  = express.Router();
var io      = require('../socket.js').listen(server);
var fs      = require('fs');
var db      = require('./../helpers/db');
var pageData      = require('./../helpers/pageData');

router.get('/', function (req, res, next) {

})

router.get('/sequencer/:userid/:groupid', function(req, res, next) {
	


	db.getData(req.params.groupid, req.params.userid, function (group, user) {
		if(!group) {
			res.redirect('/')
		}
			
		res.render('rol/sequencer', {
			group: group,
			user: user,
			navigation: pageData.navigation('sequencer'),
			alert: pageData.alert('sequencer'),
			tips: pageData.tips('sequencer'),
		})
	})
	

})
router.get('/modulator/:userid/:groupid', function(req, res, next) {
	
	console.log('if the user is not part of this group, move back to /');
	db.getData(req.params.groupid, req.params.userid, function (group, user) {
		if(!group) {
			res.redirect('/')
		}
		
		res.render('rol/modulator', {
			group: group,
			user: user,
			navigation: pageData.navigation('modulator'),
			alert: pageData.alert('modulator'),
			tips: pageData.tips('modulator'),
		})
	})


})
router.post('/save', function (req, res, next) {
	
	
	db.updateGroup(req.body.groupid,req.body.group, function (group) {
		res.end();
	})
	// db.updateGroup
})
router.post('/leave', function (req, res, next) {
	console.log('posting to leave, ' , req.body);
	
	db.leaveGroup(req.body.groupid, req.body.role, req.body.group, function (group) {

		res.send(group);
		res.end();
	})
	// db.updateGroup
})

module.exports = router;