var express = require('express');  
var app     = express();
var server    = require('http').Server(app);
var router  = express.Router();
var io           = require('../socket.js').listen(server);
var fs      = require('fs');
var modular = require('../helpers/modular.js');
var db      = require('./../helpers/db');
router.get('/', function (req, res, next) {

})



// clearInterval(interval);

router.get('/sequencer/:userid/:groupid', function(req, res, next) {
	


	db.getData(req.params.groupid, req.params.userid, function (data) {
		// data.pp =  [261.63, 293.66	, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
		data.group.adsr = [{type:'sustain', value:true, max:null},{type:'attack', value:0.2, max:1}, {type:'decay', value:0.5, max:1}, {type:'release', value:0.5, max:1}]
		data.alert = {
			text: 'Als sequencer ben je verantwoordelijk voor de melodie. Je kunt hem vervormen en een nieuwe melodie beginnen met de step sequencer',
			action: 'start',
			head: 'Sequencer'
		}
		data.navigation = [{
			current: 'pp',
			links: [
				'sequencerLeft', 'null', 'null'
			]
		}, {
			current : 'adsr',
			links: ['null', 'null', 'sequencer']
		},
		{
			current:'sequencer',
			links: ['adsr', 'rec', 'pp' ]
		}
		]
	data.tips = [{
			text: 'Tik op de steps van de sequencer om een step aan of uit te zetten',
			cond: 'clickActive'
		}, {
			text: 'houd de step lang ingedrukt en draai je telefoon om de toonhoogte te veranderen',
			cond : 'changeFreq'
		},
		{
			text: 'Je kunt de complete melodie veranderen door een nieuwe op te nemen',
			cond : 'rec'
		},
		{
			text: 'Nice! Nog een laatste tip. Probeer met de ADSR de toonlengte te veranderen',
			cond : 'adsr'
		}
		]
		res.render('rol/sequencer', data)
	})


})
router.get('/modulator/:userid/:groupid', function(req, res, next) {
	

	db.getData(req.params.groupid, req.params.userid, function (data) {
		data.alert = {
			text: 'Als modulator vervorm je het geluid. Gebruik filters e.d. om wat vets te maken. Begin als eerste met het calibreren van je camera',
			action: 'calibrate',
			head: 'Modulator'
		}
		data.tips = [{
			text: 'Houd een filter ingedrukt en gebruik de pan-panner om de filter aan te passen',
			cond: 'filter'
		}, {
			text: 'houd de step lang ingedrukt en draai je telefoon om de toonhoogte te veranderen',
			cond : 'changeFreq'
		},
		{
			text: 'Je kunt de complete melodie veranderen door een nieuwe op te nemen',
			cond : 'rec'
		},
		{
			text: 'Nice! Nog een laatste tip. Probeer met de ADSR de toonlengte te veranderen',
			cond : 'adsr'
		}
		]
		data.navigation = [{
			current: 'filters',
			links: [
				'null', 'null', 'osc'
			]
		}, {
			current : 'osc',
			links: ['filters', 'null', 'null']
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