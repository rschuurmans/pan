var User     = require('./../models/user');
var Group    = require('./../models/group');
var mongoose = require('mongoose');
var fs      = require('fs');
var availableModules = JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8')).categories;

var tools = {

	createUser: function (name,demoBool, cb) {
		
		var newUser = new User({
			addedModules:[],
			username: name,
			groupNumber: 0000
		})

		newUser.save(function (err) {
			
			if(err) throw err;
			console.log('user created');
			tools.addModule(0, name, function () {
				console.log('added first module');
				cb(newUser);
			})

		})
	},

	userById: function(id, cb) {
		User.findById(id, function (err, user) {
			if(err) throw err;
			if(cb) {
				cb(user);
			} else {
				return user
			}
			
		})
	},
	groupByNumber: function (number, cb) {
		Group.findOne({number: number}, function (err, group){
			if(err) throw err;
			if(cb) {
				cb(group, err)
			} else {
				return group ? group : false;
			}
			
		})
	},
	uniqueGroupnumber: function () {
		var number = Math.floor(Math.random()*9000) + 1000;
		if(tools.groupByNumber(number)) {
			Math.floor(Math.random()*9000) + 1000;

		} 
		return number;
	},
	
	createGroup: function (id, cb) {
		tools.userById(id, function(user) {
			var newGroup = new Group({
			    number: tools.uniqueGroupnumber(),
			    users:[user]
			 });
			newGroup.save(function (err) {
				if(err) throw err;
				cb(newGroup.number);
			})
		})
	},
	userByName: function (username, cb) {
		User.findOne({username:username}, function(err, user) {
			cb(user)
		})
	},
	getData: function (username, groupnumber, cb) {
		tools.userByName(username, function (user) {
			tools.groupByNumber(groupnumber, function (group) {
				cb(group, user)
			})
		})
	},
	getDemoData: function (username, cb) {
		tools.userByName(username, function (user) {
			tools.getDemoGroup(function (group) {
				cb(group, user)
			})
		})
	},
	joinGroup: function (groupnumber, userid, cb) {
		tools.userById(userid, function (user) {
			Group.findOneAndUpdate({number: groupnumber}, {$push: {users: user}}, function (err, group) {
				cb(group)
			})
		})
	},
	createUserDemo: function(name, cb) {

		User.findOne({username: name}, function (err, user) {
			if(user) {
				cb(user);
			} else {
				tools.createUser(name, true, function (user) {
					tools.joinDemoGroup(user, function (user, group) {
						cb(user);
					})
				})
			}
		})	
	},
	joinDemoGroup: function (user, cb) {
		tools.getDemoGroup(function(group) {
			if(group.master !== user.username) {
				group.users.push(user)
			}
			
			group.save(function(err, group) {
				user.groupNumber = group.number;
				user.save(function (err, user) {
					cb(user, group);
				})
				
			})
		}, user)

	},
	getDemoGroup: function (cb, user) {
		Group.findOne({demo:true}, function (err, group) {
			if(group) {
				cb(group)
			}
			else {
				group = new Group({
					number: tools.uniqueGroupnumber(),
					users:[],
					demo:true
					
				})
				if(user) {
					group.master=user.username
				}
				group.save(function (err, group) {
					cb(group);
				})
			}
		})
	},
	updateUsername: function (userId, gnumb, newName, cb) {
		tools.userById(userId, function (user) {

			tools.groupByNumber(gnumb, function (group) {

				user.username      = newName;
				user.groupId       = group._id;
				user.groupNumber = group.number;
				user.save();

				Group.findOneAndUpdate({number:gnumb, "users._id": mongoose.Types.ObjectId(userId) }, {
					"users.$.username": newName
				}, function (err, res) {
					cb(group)
				})
			})
		})
		
		
	},
	addModule: function(moduelId, userId, cb) {
		// var module = null;
		// for(var i=0; i < availableModules.length;i++) {
		// 	for (var y=0; y < availableModules[i].modules.length;y++) {
		// 		if(availableModules[i].modules[y].id == moduelId) {
		// 			module = availableModules[i].modules[y];
		// 			User.findOneAndUpdate({_id: userId}, {$push: {addedModules: module}}, function (err, user) {

		// 				cb(user, module)
		// 			})
		// 			break;
		// 		}
		// 	}
		// }
		
		
	},
	getSingleModule: function (moduleId, cb) {
		// from: http://stackoverflow.com/questions/22343437/javascript-find-child-object-in-nested-arrays
		var matches = [];
		var needle = 0; // what to look for
		
		availableModules.forEach(function(e) {
		    matches = matches.concat(e.modules.filter(function(c) {
		        return (c.id === moduleId);
		    }));
		});
		if(cb) {
			cb(matches[0])
		} else {
			return matches[0]
		}
		
		

	},
	addModule: function (moduleId, username, cb) {
		console.log(username, moduleId);
		tools.userByName(username, function (user) {
			console.log(user);
			tools.getSingleModule(parseInt(moduleId), function (module) {
				console.log(user.addedModules);
				module.moduleId = new mongoose.mongo.ObjectId();

				user.addedModules.push(module);
				console.log('user',user,'moduke', module);
				user.save(function () {
					cb()
				})
			})
		})
	},

	removeModule: function (moduleId, username, cb) {
		tools.userByName(username, function (user) {
			tools.getModuleByModuleId(user, moduelId, function (user, module, index) {
				user.addedModules.splice(index, 1);
					user.save(function () {
						cb();
					})
			})
			
		})
	},

	getModuleByModuleId: function(username, moduleId, cb) {
		tools.userByName(username, function (user) {
			for(var i = 0; i < user.addedModules.length;i++) {
				console.log(user.addedModules[i].moduleId == moduleId, user.addedModules[i].moduleId , moduleId);
				if(user.addedModules[i].moduleId == moduleId) {
					cb(user, user.addedModules[i], i);
				}
			}
		})
	},
	getModule: function (moduelId, userId, cb) {
		
		tools.userById(userId, function (user) {
			
			for(var i = 0; i<user.addedModules.length;i++) {
				if(user.addedModules[i].id == moduelId) {
					cb(user.addedModules[i], user)
				}
			}
		}) 
	}
}

module.exports = tools;
