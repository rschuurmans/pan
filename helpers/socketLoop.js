var express      = require('express');
var app          = express();
var server       = require('http').Server(app);
var io           = require('../socket.js').listen(server);


var socketLoop = {
	active: true,
	interval: null,
	serverDelay: 1000,
	startInterval: function () {
		
		io.sockets.emit('startSequence', socketLoop.serverDelay)
		socketLoop.interval = setInterval(function () {
		  // this is the start of 16 steps
		  
		  io.sockets.emit('startSequence', socketLoop.serverDelay)
		}, socketLoop.serverDelay)
	},
	stopInterval: function () {
		clearInterval(socketLoop.interval);
		socketLoop.interval = null;
	},
	toggle: function () {
		console.log('toggling');
		socketLoop.active = !socketLoop.active;

		if(socketLoop.active) {
			socketLoop.startInterval();
		} else {
			socketLoop.stopInterval();
		}
	}
}
socketLoop.startInterval();
module.exports = socketLoop;