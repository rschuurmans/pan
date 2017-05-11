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

router.get('/sequencer/:groupid/:userid', function(req, res, next) {
	db.getData(req.params.groupid, req.params.userid , function (group, user) {
		var data = {
			group: group
		}
		

		res.render('rol/sequencer', group)
	})
	

})
router.get('/modulator/:groupid/:userid', function (req, res, next) {
	
	// socketModule.joinDuo(req.cookies.groupId);
	db.getData(req.params.groupid, req.params.userid , function (group, user) {
	
		var data = {
			group: group
		}
		res.render('rol/modulator', group)
	})
})



module.exports = router;