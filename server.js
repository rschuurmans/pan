var express      = require('express');
var app          = express();
var http         = require('http').Server(app);
var indexRouter  = require('./routes/index');
var createRouter = require('./routes/create');
var playRouter   = require('./routes/play');

var exphbs         = require('express-handlebars');
var bodyParser     = require('body-parser');
var path           = require('path'); 
var fs             = require('fs');
// var sassMiddleware = require('node-sass-middleware');

app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}))

// app.use(
// 	sassMiddleware({
// 		src: __dirname + '/public/sass',
// 		dest: __dirname + '/public',
// 		debug:true,
// 		force: true

// 	})
// )

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);
app.use('/play', playRouter)
// app.use('/create', createRouter);
// app.use('/play', playRouter);


// 404 page
app.route('*')
  .get(function (req, res) {
    res.send('404');
  })

// reload(http, app)
http.listen(3000, function(){
  console.log('listening on *:3000');
});
