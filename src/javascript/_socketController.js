var socket = io();


socket.on('connect', function () {
	if(window.hasOwnProperty( "data" )) {
		console.log('going to join a room');

		socket.emit('joinRoom', data._id);
	
	}

	socket.on('updateSources', function (data) {
		console.log('received a socket', data);
		sources.update(data);
	})

	
	
})


