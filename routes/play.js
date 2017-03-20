var express    = require('express');  
var router     = express.Router();
var fs         = require('fs');


var combineGrid = function (grid, activeModules) {
	for(var i in activeModules) {
		grid.rows[activeModules[i].row].items[activeModules[i].col] = activeModules[i]
	}
	return grid
}
var removeObj = function (obj, prop, target) {
	var index;

	for(var i in obj) {
		if(obj[i][prop] == target) {
			index = i;
		}
	}
	obj.splice(index, 1);
	return obj
}
var newModule = function (req, data) {
	console.log(req, data);
	var newItem = {};
	for(var i in data ){
		for(var y in data[i].modules) {
			console.log('hier',req.gridPlace.col);
			if(data[i].modules[y].id == parseInt(req.moduleId)) {
				
				newItem          = data[i].modules[y];
				newItem.category = data[i].category;
				newItem.col      = req.gridPlace.col;
				newItem.row      = req.gridPlace.row;
			}
		}
	}
	console.log('newItem' , newItem);
	return newItem;
}
var getModule = function (id){ 
	var data = JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8')).categories;
	var module = {};
	for(var i in data) {
		for(var y in data[i].modules) {
			
			if(data[i].modules[y].id == id) {
				module = data[i].modules[y];
				break;
			}
		}
	}
	return module;
}

router.get('/', function(req, res, next) { 
	
	var data = new Object();
	data.user = JSON.parse(fs.readFileSync('public/data/user.json', 'utf8'));
	
	data.grid = combineGrid(JSON.parse(fs.readFileSync('public/data/grid.json', 'utf8')), data.user.activeModules);
	console.log(data.grid.rows[0]);
	res.render('play/overview', data);
	
});
router.get('/module/:id', function (req, res, next) {
	console.log(req.params.id);
	var data = getModule(req.params.id);
	res.render('play/module', data);
})
router.get('/list/:place', function (req, res, next ) {
	console.log(req.params.place);
	
	

	var data = JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8'));

	res.render('play/list', data)
});
router.post('/add', function (req, res, next) {
	var user    = JSON.parse(fs.readFileSync('public/data/user.json', 'utf8'));
	
	
	var newItem = newModule(req.body, JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8')).categories);
	user.activeModules.push(newItem);
	fs.writeFileSync('public/data/user.json', JSON.stringify(user, null, 2));
	res.send({
		redirectTo: '/play'
	})
	
	

})
router.post('/remove', function (req, res, next) {
	console.log('post /remove');
	var data  = JSON.parse(fs.readFileSync('public/data/user.json', 'utf8'));
	
	data.activeModules = removeObj(data.activeModules, 'id', req.body.moduleId);

	fs.writeFileSync('public/data/user.json', JSON.stringify(data));
	res.send({
		redirectTo: '/play'
	})
	


})

module.exports = router;  