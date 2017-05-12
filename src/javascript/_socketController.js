var socket = io();


socket.on('connect', function () {
	if(audioData) {
		console.log('going to join a room');

		socket.emit('joinRoom', audioData._id);
	
	}

	socket.on('testmessage', function (data) {
		console.log(data);
	})

})


// var socketFunc = {
// 	joinRoom: function () {
// 		console.log('trying to join room: ', audioData._id);
		

// 	}
// }
// var first = true;
// socket.on('connect', function () {
// 	setLive.infiniteSequencer();
// })