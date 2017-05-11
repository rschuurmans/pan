var socket = io();

var room = 'room1'
console.log('eyo');

socket.on('connect', function () {
	console.log('connect');
	socket.emit('message', {
		message: 'Init message',
		room: false
	})
	socket.emit('joinRoom', {
		room: room
	})
	socket.emit('update', {
		message: 'joining a room '
	})
	
	// if(roomNumber) {
	// 	var data = {
	// 		room: 'room' + roomNumber
	// 	}
	// 	socket.emit('join', data)
	// }
})





// var list = document.querySelector('.fn-list-demo');

// // window.setInterval(function () {
// // 	createItem();
// // },1000);
// var createItem = function () {
// 	console.log('startSequence');
// 	var listItem = document.createElement('li');
// 	var data = new Date().getTime();
// 	var text = document.createTextNode('start sequence!   ' + data);
// 	listItem.append(text);
// 	list.appendChild(listItem);
// }
// socket.on('startSequence', function (data) {
// 	createItem();
// })