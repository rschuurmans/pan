var server = require('./server.js');
var io = require('socket.io').listen(server);
console.log(server);
module.exports = io;