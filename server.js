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
// var socketLoop = require('./helpers/socketLoop');



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
mongoose.connect('mongodb://admin:Roos1995!@ds025772.mlab.com:25772/pan-live');


var serverDelay = 4000;
var interval = setInterval(function () {
  io.sockets.emit('startSequence', serverDelay)
}, serverDelay)


io.on('connection', function (socket) {
  
  socket.on('joinRoom', function (data) {
    

    socket.join(data.room);
  });
  socket.on('joinDuo', function (data) {
    

    socket.username = data.username;
    socket.role = data.role;
    socket.duo = data.room;
    socket.userid = data.userId;
    
    socket.join(data.room);
  });
  socket.on('liveUpdate', function (data) {
    
    io.sockets.to(data.room).emit('liveUpdate', data);
  });


  socket.on('updateAllSteps', function(data) {
    io.sockets.to(data.room).emit('updateAllSteps', data);
  })
  socket.on('groupUpdate', function (data) {
    
    io.sockets.to(data.room).emit('groupUpdate', data);
  })
  socket.on('updateSources', function (data) {
    io.sockets.to(data.room).emit('updateSources', data);
  })
  socket.on('updateSingleStep', function (data) {
   
    io.sockets.to(data.room).emit('updateSingleStep', data);
  })
  socket.on('audioBlob', function (data) {

    io.sockets.to(data.room).emit('audioBlob', data);
  })
  socket.on('updateSustain', function (data) {
    
    io.sockets.to(data.room).emit('updateSustain', data);
  })
  socket.on('listenPP', function (data) {
    
    io.sockets.to(data.room).emit('listenPP', data);
  })
   socket.on('stopPP', function (data) {
    
    io.sockets.to(data.room).emit('stopPP', data);
  })
  socket.on('updateADSR', function (data) {
    io.sockets.to(data.room).emit('updateADSR', data);
  })
  socket.on('ppValues', function (data) {
    io.sockets.to(data.room).emit('ppValues', data);
  })
  socket.on('updateFilter', function (data) {
    io.sockets.to(data.room).emit('updateFilter', data);
  })
  socket.on('demo', function (data) {
    io.sockets.emit('demo', data);
  })
  socket.on('disconnect', function(){
    
     socket.broadcast.emit('liveUpdate', {
      user: {
        id: socket.userid,
        active: false
      }
    })
    socket.to(socket.duo).emit('user left', {
      username: socket.username,
      role: socket.role,
      userid: socket.userid
    })
   
  });


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
