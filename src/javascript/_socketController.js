var socket = io();


socket.on('connect', function () {
	if(window.hasOwnProperty( "audioData" )) {
		console.log('going to join a room');

		socket.emit('joinRoom', audioData._id);
	
	}

	socket.on('testmessage', function (data) {
		console.log(data);
	})

})


