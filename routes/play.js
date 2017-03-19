var express    = require('express');  
var router     = express.Router();
var fs         = require('fs');


var combineGrid = function (grid, activeModules) {
	// console.log(grid, user);
	for(var i in activeModules) {
		grid.rows[activeModules[i].row].items[activeModules[i].col] = activeModules[i]

	}
	return grid
}
router.get('/', function(req, res, next) { 
	
	var data = new Object();
	data.user = JSON.parse(fs.readFileSync('data/user.json', 'utf8'));
	data.grid = combineGrid(JSON.parse(fs.readFileSync('data/grid.json', 'utf8')), data.user.activeModules);
	
	res.render('play/main', data);
	
});
router.post('/remove', function (req, res, next) {
	var data  = JSON.parse(fs.readFileSync('data/user.json', 'utf8'));
	
	var activeModules = data.activeModules;
	var index;
	console.log(req.body.moduleId);
	for(var i in activeModules) {
		if(activeModules[i].id == req.body.moduleId) {
			index = i;
		}
	}
	activeModules.splice(index, 1);
	console.log(activeModules);
	data.activeModules = activeModules;
	
	fs.writeFileSync('data/user.json', JSON.stringify(data));
	res.redirect('/play')


})

module.exports = router;  