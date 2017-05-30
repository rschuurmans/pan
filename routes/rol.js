var express = require('express');  
var app     = express();
var server    = require('http').Server(app);
var router  = express.Router();
var io           = require('../socket.js').listen(server);
var fs      = require('fs');
var modular = require('../helpers/modular.js');
var db      = require('./../helpers/db');
// var testData = audioData  = {"_id":"5911f16fa40f795972c206c4","timestamp":"2017-05-09T16:42:23.669Z","sequencer":{"_id":"5911f16fa40f795972c206c5","groupId":"5911f16fa40f795972c206c4","role":"sequencer","startDate":"2017-05-09T16:42:23.756Z","active":true,"username":"Roos-seq","__v":0},"modulator":null,"groupCounter":1,"__v":0,"modulate":[{"type":"Delay","values":{"feedback":0.1,"delayTime":0.1,"wetLevel":0,"dryLevel":0,"cutoff":2000,"bypass":0},"setValue":"delayTime"},{"type":"Chorus","values":{"rate":0,"feedback":0,"delay":0,"bypass":0},"setValue":"rate"},{"type":"Tremelo","values":{"intensity":0,"rate":0.001,"stereoPhase":0,"bypass":0},"setValue":"intensity"},{"type":"Overdrive","values":{"outputGain":0,"drive":0,"curveAmount":1,"algorithmIndex":0,"bypass":0},"setValue":"drive"}],"sources":[{"type":"SINE","newObj":true}],"steps":[{"frequency":261.63,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":392,"active":false,"sustain":null,"min":0,"max":2200},{"frequency":293.66,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":392,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":493.88,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":493.88,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":349.23,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":493.88,"active":false,"sustain":null,"min":0,"max":2200},{"frequency":523.25,"active":false,"sustain":null,"min":0,"max":2200},{"frequency":329.63,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":493.88,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":329.63,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":493.88,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":261.63,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":329.63,"active":false,"sustain":null,"min":0,"max":2200},{"frequency":261.63,"active":true,"sustain":null,"min":0,"max":2200}]};
router.get('/', function (req, res, next) {

})



// clearInterval(interval);

router.get('/sequencer/:userid/:groupid', function(req, res, next) {
	

	// db.getData(req.params.groupid, req.params.userid , function (group, user) {
	// 	var data = {
	// 		group: group
	// 	}
		

	// 	res.render('rol/sequencer', group)
	// })
	// res.render('rol/sequencer', {})

	db.getData(req.params.groupid, req.params.userid, function (data) {
		data.pp =  [261.63, 293.66	, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
		data.adsr = [{type:'attack', value:0}, {type:'decay', value:0}, {type:'sustain', value:0}, {type:'release', value:0}]
		res.render('rol/sequencer', data)
	})


})
router.get('/modulator/:userid/:groupid', function(req, res, next) {
	

	// db.getData(req.params.groupid, req.params.userid , function (group, user) {
	// 	var data = {
	// 		group: group
	// 	}
		

	// 	res.render('rol/sequencer', group)
	// })
	// res.render('rol/sequencer', {})

	db.getData(req.params.groupid, req.params.userid, function (data) {
		data.group.sources = [{
			newObj:true,
			type:'sine',
			detune:50,
			active:true
		},
		{
			newObj:true,
			type:'sine',
			detune:20,
			active:true
		},
		{
			newObj:true,
			type:'sine',
			detune:70,
			active:true
		}
		]
		res.render('rol/modulator', data)
	})


})
router.post('/data', function (req, res, next) {
	// console.log('from post:',req.body);
	var newGroup = req.body;

	db.updateGroup(newGroup._id, newGroup, function (group) {

	})
})

module.exports = router;