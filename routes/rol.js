var express = require('express');  
var db      = require('./../helpers/db');
var router  = express.Router();

router.get('/', function (req, res, next) {
	res.send('rol/index');
	db.userById(req.cookies.userId, function (user) {
		// console.log(isSequencer);
		res.render('rol/sequencer');
	})
})

router.get('/sequencer', function(req, res, next) {
	console.log('getting this');
	db.getSoundData(req.cookies.userId, function (data) {
		data.modulate = [
			{
				type: 'Delay',
				values: {
					feedback:0.1,
					delayTime:0.1,
					wetLevel:0,
					dryLevel:0,
					cutoff:2000,
					bypass:0
				},
				setValue: 'delayTime'
			},
			{
				type: 'Chorus',
				values: {
					rate:0,
					feedback:0,
					delay:0,
					bypass:0,
				},
				setValue: 'rate'
			},
			{
				type: 'Tremelo',
				values: {
					intensity: 0,
					rate: 0.001,
					stereoPhase: 0,   
					bypass: 0
				},
				setValue:'intensity'
			},
			{
				type: 'Overdrive',
				values: {
					outputGain: 0,
				    drive: 0,
				    curveAmount: 1,
				    algorithmIndex: 0,
				    bypass: 0
				},
				setValue:'drive'
			}
		]
		res.render('rol/sequencer', data)
	})

})
router.get('/modulate', function (req, res, next) {
	db.getSoundData(req.cookies.userId, function (data, user) {
		console.log('get sound data callback');
		data.modulate = [
			{
				type: 'delay',
				value: 0,
			},
			{
				type: 'chorus',
				value: 0,
			},
			{
				type: 'Tremmelo',
				value: 0,
			},
			{
				type: 'Gain',
				value: 0,
			}
		]
		res.render('rol/modulate', data)
	})
})


module.exports = router;  