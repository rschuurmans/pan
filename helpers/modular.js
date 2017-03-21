var fs      = require('fs');

var modular = {
	newModule: function (col, moduleId, data) {
		var newItem = {};
		for(var i in data ){
			for(var y in data[i].modules) {
				if(data[i].modules[y].id == parseInt(moduleId)) {
					
					newItem          = data[i].modules[y];
					newItem.category = data[i].category;
					newItem.col      = parseInt(col);
				}
			}
		}
		return newItem;
	},
	getCategory: function (category, data) {
		for(var i in data) {
			if(data[i].category == category) {
				return data[i];
				break;
			}
		}
	},
	setLive: function (user, isLive) {
		console.log(user.live);
		user.live = Boolean(isLive);
		return user;
	},
	getModule: function (id, data) {

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
	},
	addModule: function (user, col, moduleId, data) {
		var newItem = modular.newModule(col, moduleId, data);
		
		for(var i in user.modules) {
			if(user.modules[i].category == newItem.category) {
				user.modules[i].module[newItem.col] = newItem;
				
			}
		}
		return user;
	},
	getUnactiveModule: function (col) {
		return {
			active: false,
			col: parseInt(col)
		}
	},
	removeModule: function (modules, col, category) {
		
		for(var i in modules) {
			if(modules[i].category == category) {
				for(var y in modules[i].module){
					if(modules[i].module[y].col == col) {
						modules[i].module[y] = modular.getUnactiveModule(col);
						console.log(modules[i].module[y]);
					}
				}
			}
		}
		console.log(modules[0]);
		return modules
	}
}
module.exports = modular;
