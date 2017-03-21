var express      = require('express');
var app          = express();
var http         = require('http').Server(app);
var indexRouter  = require('./routes/index');
var createRouter = require('./routes/create');
var playRouter   = require('./routes/play');

var exphbs     = require('express-handlebars');
var bodyParser = require('body-parser');
var path       = require('path'); 
var fs         = require('fs');
var handlebars = require('./helpers/handlebars.js')(exphbs);

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}))


app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);
app.use('/play', playRouter);

// 404 page
app.route('*')
  .get(function (req, res) {
    res.send('404');
  })

http.listen(3000, function(){
  console.log('listening on *:3000');
});
