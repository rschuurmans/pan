var socket = io();
// var binary = new BinaryClient('ws://localhost:3000');

// binary.on('open', function () {

// 	window.Stream = binary.createStream();

// })

var listen = {

	master: function () {
		
			
			socket.emit('joinRoom', 'master');
			socket.emit('joinRoom', 'live');


			socket.on('audioBlob', function (received) {
				
				
				 masterSequence.parseBlobAudio(received.data);
				 received.data.blob = null;
				 liveRoom.checkUser(received.data);
				
			})
			socket.on('liveUpdate', function (received) {
				liveRoom.updateActiveUsers(received);
				
			})

		
	},
	role: function () {
		// listen.modulate();
		
			
		var groupId = tools.currentGroupId();

		socket.emit('joinRoom', groupId);
		socket.emit('joinRoom', 'live');



		sendSocket.send('groupUpdate', groupId, {text: data.user.username + ' heeft zich aangesloten'})
		
		socket.on('demo', function (received) {
			
			demosec(received);
		})
		
	
		// happens: updated melody from sequencer
		socket.on('updateAllSteps', function (received) {
			data.group.steps = received.data.steps;
			
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
		
		

		
		


	},
	modulate: function () {
		socket.on('updateSteps', function (received) {
			console.log('received a socket', received);
			data.steps[received.index] = received.step;
		})
	}
}

var listenStartSocket = function () {
	socket.on('startSequence', function (fulldelay) {
		if(loop.stopped) {
			console.log('start loop from sokt');
			loop.start(fulldelay);
		} 
	})
}




var sendSocket = {
	send: function (socketName, id, sendData) {	
		console.log('sending this socket', socketName);
		socket.emit(socketName, {
			room:id,
			data: sendData
		})
	}
}