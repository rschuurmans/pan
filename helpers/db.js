var User     = require('./../models/user');
var Group    = require('./../models/group');
var mongoose = require('mongoose');
var fs      = require('fs');
var availableModules = JSON.parse(fs.readFileSync('public/data/availableModules.json', 'utf8')).categories;

var db = {
	initDemo: function (username,res, cb ) {
		db.getDemoGroup(function (group) {
			db.getDemoUser(username, group, function (user) {
				res.cookie('userId', user._id.toString())
				var match = false;
				var userInGroup = {
					username:user.username,
					id: user._id,
					isSequencer: true
				}
				
				for(var i = 0 ; i < group.activeSounds.length ; i++) {

					if(group.activeSounds[i].members.length <= 1) {
						match = true;

						if(group.activeSounds[i].members[0].isSequencer || group.activeSounds[i].members[0].isSequencer == 'true') {
							userInGroup.isSequencer = false;
						}
						group.activeSounds[i].members.push(userInGroup);
						break;
					}
				}
				if(!match) {
					var stepsChoices = [4, 8,16];
					var steps        = stepsChoices[Math.floor(Math.random()*stepsChoices.length)];
					var randomSteps  = db.randomSequenceValues(steps);
					var randomSource = db.randomSource(steps);
					group.activeSounds.push({
						members:[userInGroup],
						steps:randomSteps,
						source:randomSource,
						timestamp:new Date()
					})
				}
				
				group.markModified('activeSounds');

				group.save(function (err) {
					if(err) { console.log( err) }
					db.saveRole(user._id, userInGroup.isSequencer, function (newuser) {
						cb(newuser)
					})
				})				
				
			})
		})

		
	},
	saveRole: function (id, isSequencer, cb) {
		var role = 'modulate'
		if(isSequencer) {
			role = 'sequencer'
		}
		User.findById(id, function (err, user) {
			if(err) { console.log( err) }
			user.role = role;
			user.save(function (err) {
				if(err) { console.log( err) }
				cb(user)
			})
		})
		
	},
	getDemoUser: function (username,group, cb) {
		db.userByName(username, function (user) {
			if(user) {
				cb(user)
			} else {
				var user  = new User({
					username:username,
					active: true,
					startDate: new Date(),
					role: 'none'
				})

				user.save(function () {
					cb(user)
				});
			}
		})
	},
	
	getDemoGroup: function (cb) {
		Group.findOne({demo: true}, function (err, group) {
			if(group) {
				cb(group);
			}
			else {
				group = new Group({
					activeSounds: [],
					users:[],
					timestamp: new Date(),
					demo: true
				})
				group.save(function (err, group) {
					cb(group)
				})
			}
		})
	},
	userByName: function (username, cb) {
		User.findOne({username:username}, function(err, user) {
			cb(user)
		})
	},
	userById: function(id, cb) {
		// return true;
		User.findById(new mongoose.mongo.ObjectId(id), function (err, user) {
			if(err) throw err;
			if(cb) {
				cb(user);
			} else {
				return user
			}
			
		})
	},
	randomSequenceValues: function (steps) {
		var CMajor = [261.63, 293.66	, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

		var data = [];

		for(var i=0;i<steps;i++) {
			data.push({
				frequency: CMajor[Math.floor(Math.random()*CMajor.length)],
				active: Math.random() >= 0.5,
				sustain: null,
				min:0,
				max:2200
			})
		};
		return data;
	},
	randomSource: function (steps) {
		var data = [{
			type:'SINE',
			newObj: true
		}];
		return data;
	},
	getSoundData: function (userId, cb) {
		db.getDemoGroup(function (group) {
			var activeSoundDuo = null;
			for(var i = 0; i < group.activeSounds.length;i++) {
				for(var y = 0; y < group.activeSounds[i].members.length;y++) {
					if(group.activeSounds[i].members[y].id == userId) {
						activeSoundDuo = group.activeSounds[i];
							
						break;
					}
				}
				
			}

			db.userById(userId, function (user) {
				cb(activeSoundDuo, user)
			})

		})
	}
}

// var tools = {

// 	createUser: function (name,demoBool, cb) {
		
// 		var newUser = new User({
// 			addedModules:[],
// 			username: name,
// 			groupNumber: 0000
// 		})

// 		newUser.save(function (err) {
			
// 			if(err) throw err;
// 			console.log('user created');
// 			tools.addModule(0, name, function () {
// 				console.log('added first module');
// 				cb(newUser);
// 			})

// 		})
// 	},


// 	groupByNumber: function (number, cb) {
// 		Group.findOne({number: number}, function (err, group){
// 			if(err) throw err;
// 			if(cb) {
// 				cb(group, err)
// 			} else {
// 				return group ? group : false;
// 			}
			
// 		})
// 	},
// 	uniqueGroupnumber: function () {
// 		var number = Math.floor(Math.random()*9000) + 1000;
// 		if(tools.groupByNumber(number)) {
// 			Math.floor(Math.random()*9000) + 1000;

// 		} 
// 		return number;
// 	},
	
// 	createGroup: function (id, cb) {
// 		tools.userById(id, function(user) {
// 			var newGroup = new Group({
// 			    number: tools.uniqueGroupnumber(),
// 			    users:[user]
// 			 });
// 			newGroup.save(function (err) {
// 				if(err) throw err;
// 				cb(newGroup.number);
// 			})
// 		})
// 	},
// 	userByName: function (username, cb) {
// 		User.findOne({username:username}, function(err, user) {
// 			cb(user)
// 		})
// 	},
// 	getData: function (username, groupnumber, cb) {
// 		tools.userByName(username, function (user) {
// 			tools.groupByNumber(groupnumber, function (group) {
// 				cb(group, user)
// 			})
// 		})
// 	},
// 	getDemoData: function (username, cb) {
// 		tools.userByName(username, function (user) {
// 			tools.getDemoGroup(function (group) {
// 				cb(group, user)
// 			})
// 		})
// 	},
// 	joinGroup: function (groupnumber, userid, cb) {
// 		tools.userById(userid, function (user) {
// 			Group.findOneAndUpdate({number: groupnumber}, {$push: {users: user}}, function (err, group) {
// 				cb(group)
// 			})
// 		})
// 	},
// 	createUserDemo: function(name, cb) {

// 		User.findOne({username: name}, function (err, user) {
// 			if(user) {
// 				cb(user);
// 			} else {
// 				tools.createUser(name, true, function (user) {
// 					tools.joinDemoGroup(user, function (user, group) {
// 						cb(user);
// 					})
// 				})
// 			}
// 		})	
// 	},
// 	joinDemoGroup: function (user, cb) {
// 		tools.getDemoGroup(function(group) {
// 			group.save(function(err, group) {
// 				cb.save();
// 			})
// 		}, user)

// 	},
// 	getDemoGroup: function (cb, user) {
// 		Group.findOne({demo:true}, function (err, group) {
// 			if(group) {
// 				cb(group)
// 			}
// 			else {
// 				group = new Group({
// 					activeSounds:[],
// 					users       :[{
// 						username: user.username,
// 						id: user._id
// 					}],
// 					timestamp   : new Date(),
// 					demo        :true
// 				})

// 				group.save(function (err, group) {
// 					cb(group);
// 				})
// 			}
// 		})
// 	},
// 	updateUsername: function (userId, gnumb, newName, cb) {
// 		tools.userById(userId, function (user) {

// 			tools.groupByNumber(gnumb, function (group) {

// 				user.username      = newName;
// 				user.groupId       = group._id;
// 				user.groupNumber = group.number;
// 				user.save();

// 				Group.findOneAndUpdate({number:gnumb, "users._id": mongoose.Types.ObjectId(userId) }, {
// 					"users.$.username": newName
// 				}, function (err, res) {
// 					cb(group)
// 				})
// 			})
// 		})
		
		
// 	},
// 	addModule: function(moduelId, userId, cb) {
// 		// var module = null;
// 		// for(var i=0; i < availableModules.length;i++) {
// 		// 	for (var y=0; y < availableModules[i].modules.length;y++) {
// 		// 		if(availableModules[i].modules[y].id == moduelId) {
// 		// 			module = availableModules[i].modules[y];
// 		// 			User.findOneAndUpdate({_id: userId}, {$push: {addedModules: module}}, function (err, user) {

// 		// 				cb(user, module)
// 		// 			})
// 		// 			break;
// 		// 		}
// 		// 	}
// 		// }
		
		
// 	},
// 	getSingleModule: function (moduleId, cb) {
// 		// from: http://stackoverflow.com/questions/22343437/javascript-find-child-object-in-nested-arrays
// 		var matches = [];
// 		var needle = 0; // what to look for
		
// 		availableModules.forEach(function(e) {
// 		    matches = matches.concat(e.modules.filter(function(c) {
// 		        return (c.id === moduleId);
// 		    }));
// 		});
// 		if(cb) {
// 			cb(matches[0])
// 		} else {
// 			return matches[0]
// 		}
		
		

// 	},
// 	addModule: function (moduleId, username, cb) {
// 		console.log(username, moduleId);
// 		tools.userByName(username, function (user) {
// 			console.log(user);
// 			tools.getSingleModule(parseInt(moduleId), function (module) {
// 				console.log(user.addedModules);
// 				module.moduleId = new mongoose.mongo.ObjectId();

// 				user.addedModules.push(module);
// 				console.log('user',user,'moduke', module);
// 				user.save(function () {
// 					cb()
// 				})
// 			})
// 		})
// 	},

// 	removeModule: function (moduleId, username, cb) {
// 		tools.userByName(username, function (user) {
// 			tools.getModuleByModuleId(user, moduelId, function (user, module, index) {
// 				user.addedModules.splice(index, 1);
// 					user.save(function () {
// 						cb();
// 					})
// 			})
			
// 		})
// 	},

// 	getModuleByModuleId: function(username, moduleId, cb) {
// 		tools.userByName(username, function (user) {
// 			for(var i = 0; i < user.addedModules.length;i++) {
// 				console.log(user.addedModules[i].moduleId == moduleId, user.addedModules[i].moduleId , moduleId);
// 				if(user.addedModules[i].moduleId == moduleId) {
// 					cb(user, user.addedModules[i], i);
// 				}
// 			}
// 		})
// 	},
// 	getModule: function (moduelId, userId, cb) {
		
// 		tools.userById(userId, function (user) {
			
// 			for(var i = 0; i<user.addedModules.length;i++) {
// 				if(user.addedModules[i].id == moduelId) {
// 					cb(user.addedModules[i], user)
// 				}
// 			}
// 		}) 
// 	}
// }

module.exports = db;
