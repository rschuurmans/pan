var express = require('express');  
var router  = express.Router();
var fs      = require('fs');

router.get('/', function(req, res, next) { 
	// var categoriesz = JSON.parse(fs.readFileSync('data/availableModules.json', 'utf8')); 
	var data = JSON.parse(fs.readFileSync('data/grid.json', 'utf8')); 
	res.render('play/main', data);
});

module.exports = router;  