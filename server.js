var express      = require('express');
var app          = express();
var http         = require('http').Server(app);
var indexRouter  = require('./routes/index');
var createRouter = require('./routes/create');
var playRouter   = require('./routes/play');
var testRouter   = require('./routes/test');
var rolRouter   = require('./routes/rol');

var exphbs       = require('express-handlebars');
var bodyParser   = require('body-parser');
var path         = require('path'); 
var fs           = require('fs');
var handlebars   = require('./helpers/handlebars.js')(exphbs);
var cookieParser = require('cookie-parser');
var mongoose     = require('mongoose');
var session      = require('express-session');
// var io           = require('socket.io')(http);
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
mongoose.connect('mongodb://admin:Roos1995!@ds029381.mlab.com:29381/pan2');
// mongodb://<dbuser>:<dbpassword>@ds029381.mlab.com:29381/pan2

var checkUser = function (req, res, next) {
  next();
  // db.userById(req.cookies.userId, function (user) {
  //   if(user) {
  //     next();
  //   } else {
  //     res.redirect('/')
  //   }
  // })
 }


app.use('/', indexRouter);
app.use('/play',checkUser, playRouter);
app.use('/create',checkUser, createRouter);
app.use('/test',checkUser, testRouter);
app.use('/role',checkUser, rolRouter);


// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('news', function (data) {
//     console.log(data);
//   });
// });
      
    

// 404 page
app.route('*')
  .get(function (req, res) {
    res.send('404');
  })


http.listen(3000, function(){
  console.log('listening on *:3000');
});
