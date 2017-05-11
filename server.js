var express      = require('express');
var app          = express();
var server       = require('http').Server(app);
var io           = require('./socket.js').listen(server);
var indexRouter  = require('./routes/index');
var rolRouter    = require('./routes/rol');

var exphbs       = require('express-handlebars');
var bodyParser   = require('body-parser');
var path         = require('path'); 
var fs           = require('fs');
var handlebars   = require('./helpers/handlebars.js')(exphbs);
var cookieParser = require('cookie-parser');
var mongoose     = require('mongoose');
var session      = require('express-session');
var db           = require('./helpers/db');




app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser())
app.use(session({ 
	secret: 'keyboard cat', 
	resave:true,
	saveUninitialized: true,
	cookie: { 
		maxAge: 60000
		}
	}))

app.use(express.static(path.join(__dirname, 'public')))
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:Roos1995!@ds137191.mlab.com:37191/pan3');

var serverDelay = 4000;
var interval = setInterval(function () {
  io.sockets.emit('startSequence', serverDelay)
}, serverDelay)


io.on('connection', function (socket) {
  console.log('connect');
  socket.on('joinRoom', function (room) {
    console.log('about to join this room: ', room);
    socket.join(room);
  });
  socket.on('message', function (data) {
  })
  socket.on('testmessage', function (data) {
    console.log('received test messagE: ', data);
    io.sockets.to(data.room).emit('testmessage', data)
  })
  socket.on('update', function (data) {
    io.sockets.emit('update', data);
  })
  socket.on('sequenceStep', function (data) {
    io.sockets.emit('sequenceStep', data);
  })
  // socket.on('startSequence', function (data) {
  //   console.log('received a serverstep', data);
  //   io.sockets.emit('startSequence', data);
  // })
  
  socket.on('updateSteps', function(data) {
    console.log('received updateSteps', data);
    io.sockets.to(data.room).emit('updateSteps', data.steps);
  })
  socket.on('sequenceStepMod', function (data) {
    io.sockets.emit('sequenceStepMod', data);
  })

})


app.use('/', indexRouter);
app.use('/role', rolRouter);


// 404 page
app.route('*')
  .get(function (req, res) {
    res.send('404');
  })


server.listen(3000, function(){
  console.log('listening on *:3000');
});
