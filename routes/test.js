var express = require('express');  
var router  = express.Router();
var db      = require('./../helpers/db');
var app = express();

var io      = require('../socket.js');
var partial = require('express-partial');
app.use(partial());


router.get('/', function(req, res, next) { 
	res.render('test');
	

});


module.exports = router;  

