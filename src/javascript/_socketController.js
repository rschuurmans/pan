var socket = io();


socket.on('connect', function () {
	if(window.hasOwnProperty( "data" )) {
		console.log('going to join a room', data.group._id);

		socket.emit('joinRoom', data.group._id);
		sendSocket.send('groupUpdate', data.group._id, {text: data.user.username + ' heeft zich aangesloten'})
	
	}

	// socket.on('updateSources', function (received) {
	// 	console.log('received a updateSources', received);
	// 	sources.update(received);
	// })
	// happens: updated melody from sequencer
	socket.on('updateAllSteps', function (received) {
		data.group.steps = received.data.steps;
		console.log('received an updateAllSteps', received);
	})
	// happens: on loop message from server
	

	socket.on('groupUpdate', function (received) {
		var message = document.querySelector('.fn-notification');
		message.innerHTML = received.data.text;
		message.style.opacity = 1;
		setTimeout(function () {
			message.style.opacity = 0;
		}, 3000)
		console.log('received an groupUpdate', received);
	})
	socket.on('updateSources', function (received) {
		sources.update[received.data.type]({id: received.data.id, value:received.data.value})
		console.log('received an updateSources', received);
	})
	socket.on('updateSingleStep', function (received) {
		data.group.steps[parseInt(received.data.index)] = received.data.step;
		console.log('received an updateSingleStep', received);
	})

	socket.on('updateSustain', function (received) {
		console.log('received an updateSustain', received);
		data.group.sustain = received.data.sustain;

		console.log('received an updateSustain', received);
	})

	socket.on('updateADSR', function (received) {
	// adsr.update(received.type, received.value)
	adsr.update(received.data.type, received.data.value);
		console.log('received an updateADSR', received);
	})
	socket.on('ppValues', function (received) {
	audio.ppFreq = received.data.freq;
		for(var i in audio.sources) {
			sources.update.volume({id:audio.sources[i].id, value:received.data.volume});
		}
		console.log('received an ppValues', received);
	})
	socket.on('updateFilter', function (received) {
		filters.update(received.data.type, received.data.value);
	})
	
	

	
	
})
var listenStartSocket = function () {
	socket.on('startSequence', function (fulldelay) {
		if(loop.stopped) {
			loop.start(fulldelay);
		}
	})
}

var modulateSocket = function () {
	socket.on('updateSteps', function (received) {
		console.log('received a socket', received);
		data.steps[received.index] = received.step;
	})
}


var sendSocket = {
	send: function (socketName, id, sendData) {
		
		socket.emit(socketName, {
			room:id,
			data: sendData
		})
	}
	// updateAllSteps: function (id, sendData) {
	// 	socket.emit('updateAllSteps', {
	// 		room: id,
	// 		data: sendData
	// 	});
	// },
	// groupUpdate: function (id, sendData) {
	// 	socket.emit('groupUpdate' , {
	// 		room: id,
	// 		data: sendData
	// 	})
	// },
	// updateSources: function (id, sendData) {
	// 	socket.emit('updateSources', {
	// 		room: id,
	// 		data: sendData
	// 	});
	// }
	// updateSingleStep: function (id, sendData) {
	// 	socket.emit('updateSingleStep', {
	// 		room: id,
	// 		data: sendData
	// 	});
	// },
	// updateSustain: function (id, sendData) {
	// 	socket.emit('updateSustain', {
	// 		room: id, 
	// 		data: sendData
	// 	})
	// }
	// updateADSR: function (id, sendData) {
	// 	socket.emit('updateADSR', {
	// 		room: id, 
	// 		data: sendData
	// 	})
	// },
	// ppValues: function (id, sendData) {
	// 	socket.emit('')
	// }
}