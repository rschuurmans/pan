var express = require('express');  
var router  = express.Router();

router.get('/', function (req, res, next) {
	res.render('rol/index');
})

router.get('/1', function(req, res, next) {
	console.log('getting this');
	res.render('rol/1');
})


module.exports = router;  