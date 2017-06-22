var users = [];
var socket = io();
// var binary = new BinaryClient('ws://localhost:3000');

// binary.on('open', function () {

// 	window.Stream = binary.createStream();

// })

var listen = {

	master: function () {
		
			
			socket.emit('joinRoom', {
				room: 'master',
			});
			socket.emit('joinRoom', {
				room: 'live',
			});


			socket.on('audioBlob', function (received) {
				
				console.log('received audio blob');
				console.log(received);
				 masterSequence.parseBlobAudio(received.data);
				 received.data.blob = null;
				 liveRoom.checkUser(received.data);
				
			})
			socket.on('liveUpdate', function (received) {
				console.log(received);
				liveRoom.checkUser(received.user);
				
			})

		
	},
	role: function () {
		// listen.modulate();
		
			
		var groupId = tools.currentGroupId();
		console.log('sending this', data.user.username);
		socket.emit('joinDuo', {
			room: groupId,
			username: data.user.username,
			role: data.user.role,
			userId: data.user._id

		});
		socket.emit('joinRoom', {
			room: 'live',
			
		});



		sendSocket.send('groupUpdate', groupId, {
				text  : data.user.username + ' heeft zich aangesloten',
				user  : data.user,
				role  : data.user.role,
				userid  : data.user._id,
				active: true
		})
		
		socket.on('demo', function (received) {
			console.log(received);
			// demosec(received);
		})
		
	
		// happens: updated melody from sequencer
		socket.on('updateAllSteps', function (received) {
			data.group.steps = received.data.steps;
			
		})
		// happens: on loop message from server
		

		socket.on('groupUpdate', function (received) {
			console.log(received);
			
			
			if(received.data.active) {
				data.group[received.data.role] = received.data.user;
				// socket.username = received.data.user.username;
				// socket.set('username', received.data.username, function () {
				// 	users[user] = user
				// })
			} else {
				data.group[received.data.role] = null;
			}
			tips.notification(received.data.text, received.data.user);
			
			
		})
		// console.log(socket);
		socket.on('updateSources', function (received) {
			sources.update(received.data);
			console.log('received an updateSources', received);
		})
		socket.on('updateSingleStep', function (received) {
			data.group.steps[parseInt(received.data.index)] = received.data.step;
			console.log('received an updateSingleStep', received);
		})

		socket.on('updateSustain', function (received) {
			console.log('received an updateSustain', received);
			data.group.sustain = adsr.sustain = received.data.sustain;

			console.log('received an updateSustain', received);
		})

		socket.on('updateADSR', function (received) {
		// adsr.update(received.type, received.value)
		adsr.update(received.data.type, received.data.value);
			console.log('received an updateADSR', received);
		})
		socket.on('listenPP', function (received) {
			pp.listenPP(received.data)
		})
		socket.on('stopPP', function (received) {
			pp.stopListenPP(received.data)
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
		socket.on('user left', function (received) {
			console.log('a user left', received);
			data.group[received.role] = null;
			

			postData.leaveGroup();

		})
		

		
		


	},
	modulate: function () {
		socket.on('updateSteps', function (received) {
			console.log('received a socket', received);
			data.steps[received.index] = received.step;
		
		})
	}
}


socket.on('disconnect', function() {
	socket.emit('demo', {
		username: socket.username
	})

    // socket.get('username', function(err, user) {
    //   delete users[user];
    //   console.log('disconnect', user);
    //   io.sockets.emit('demo', {
    //   	users: users,
    //   	user: user
    //   });
    // });
  });
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