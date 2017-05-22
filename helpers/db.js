var User             = require('./../models/user');
var Group            = require('./../models/group');
var mongoose         = require('mongoose');

var db = {
	initDemo: function (username,res, cb ) {
		db.createOrFindGroup(function (group) {
			db.createUser(username, group, function (user) {
				db.updateRole(user, group, function (user, group) {
					res.cookie('userId', user._id.toString());
					res.cookie('groupId', group._id.toString());
					

					cb(user, group, '/role/sequencer')
				})
			})
		})
	},
	createNewGroup: function (username,res ,  cb) {
		db.createGroup(function (group) {
			db.createUser(username, group, function (user) {
				db.updateRole(user, group, function (user, group) {
					res.cookie('userId', user._id.toString());
					res.cookie('groupId', group._id.toString());
					

					cb(user, group, '/role/sequencer')
				})
			})
		})
	},
	joinGroup: function (username, groupId, cb) {
		
		Group.findById(groupId, function (err, group) {
			db.createUser(username, group, function (user) {
			
				db.updateRole(user, group, function (user, group) {
					cb(user, group);
				})
			})
		})
	},
	getAllGroups: function (cb) {
		Group.find(function(err, groups) {
			
			if(err) throw err;
			cb(groups)
		})
	},
	countGroups: function (cb) {
		Group.find().count(function (err, count) {
			cb(count)
		})
	},
	updateGroup: function (groupId, newGroup, cb) {
		Group.update({_id: groupId}, {
		    effects: newGroup.effects,
		    modulate: newGroup.modulate,
		    sources: newGroup.sources,
		    steps: newGroup.steps,
		    vca: newGroup.vca
		}, function(err, res) {
		   //handle it
		   console.log(err, res);
		   cb(res);
		})


		// Group.findById(groupId, function (err, group) {
		// 	console.log('found it?',group);
			
		// 	group.save(function () {
		// 		console.log('did it work?', group);
		// 		cb(group);
		// 	})

		// })
	},
	updateRole: function (user, group, cb) {
		
		if(group.sequencer == null) {
			user.role = 'sequencer';
			group.sequencer = user;
		} else {
			user.role = 'modulator';
			group.modulator = user;
		}
		user.save(function () {
			group.save(function () {
				cb(user, group);
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
	createUser:function (username, group, cb) {
		var user = new User({
			username: username,
			active:true,
			startDate: new Date(),
			role: 'none',
			groupId: group._id
		})
		user.save( function () {
			cb(user)
		});
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
	createOrFindGroup: function (cb) {
		Group.findOne({$or:[{'sequencer': null},{'modulator':null} ]}, function (err, group) {
			if(err) throw err;
			if(group) {
				cb(group);
			} else {
				db.countGroups(function (count) {
						var melody = db.randomSequenceValues();
						var source = db.randomSource(melody.length);
						var sound = db.randomSound();
					group = new Group({
						steps: melody,
						sources: source,
						modulate: sound,
						timestamp: new Date(),
						sequencer: null,
						modulator: null,
						groupCounter: count,
						vca: false,
						effects: false
					})
					group.save(function () {
						cb(group);
					})
				})
			}
		})
	},
	createGroup: function (cb) {
		db.countGroups(function (count) {
			var melody = db.randomSequenceValues();
			var source = db.randomSource(melody.length);
			var sound  = db.randomSound();

			group = new Group({
				steps       : melody,
				sources     : source,
				modulate    : sound,
				timestamp   : new Date(),
				sequencer   : null,
				modulator   : null,
				groupCounter: count,
				vca         : false,
				effects     : false
			})
			group.save(function () {
				cb(group);
			})
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
					demo: true,
					modulate: []
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
	randomSound: function () {


		var sound = [{
				type: 'pingpong',
				values: {
					wetLevel: 1, 
				    feedback: 0.3,
				    delayTimeLeft: 0,
				    delayTimeRight: 0 
				},
				setValue: 'delayTimeLeft',
				value: 0,
				min:0,
				max:300
			},
			{
				type: 'chorus',
				values: {
					rate:0,
					feedback:0,
					delay:0,
					bypass:0,
				},
				setValue: 'rate',
				value: 0,
				min:0,
				max:300
			},
			{
				type: 'tremelo',
				values: {
					intensity: 0,
					rate: 0.001,
					stereoPhase: 0,   
					bypass: 0
				},
				setValue:'intensity',
				value: 0,
				min:0,
				max:300
			},
			{
				type: 'wahwah',
				values:{
				    automode: true,            
				    baseFrequency: 0,
				    excursionOctaves: 2,
				    sweep: 1,           
				    resonance: 10,      
				    sensitivity: 0.5,              
				    bypass: 0
				},
				setValue:'baseFrequency',
				value: 0,
				min:0,
				max:1
			}
		];
		return sound;
	},
	randomSequenceValues: function () {
		var stepsChoices = [4, 8,16, 32];

		var steps = stepsChoices[Math.floor(Math.random()*stepsChoices.length)];
		// var steps = 32;

		var CMajor = [261.63, 293.66	, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

		var data = [];
		var duration = 100;
		if(steps === 32) {
			duration = 20;
		} else if (steps == 16 ) {
			duration = 50;
		} 

		for(var i=0;i<steps;i++) {
			data.push({
				frequency: CMajor[Math.floor(Math.random()*CMajor.length)],
				active: Math.random() >= 0.5,
				sustain: null,
				min:0,
				max:1200,
				duration:duration
			})
		};

		// var data = [{"frequency":261.63,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":349.23,"active":false,"sustain":null,"min":0,"max":2200},{"frequency":493.88,"active":false,"sustain":null,"min":0,"max":2200},{"frequency":261.63,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":440,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":440,"active":false,"sustain":null,"min":0,"max":2200},{"frequency":392,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":392,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":493.88,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":293.66,"active":true,"sustain":null,"min":0,"max":2200},{"frequency":329.63,"active":false,"sustain":null,"min":0,"max":2200},{"frequency":261.63,"active":false,"sustain":null,"min":0,"max":2200},{"frequency":493.88,"active":false,"sustain":null,"min":0,"max":2200},{"frequency":293.66,"active":false,"sustain":null,"min":0,"max":2200},{"frequency":349.23,"active":false,"sustain":null,"min":0,"max":2200},{"frequency":261.63,"active":true,"sustain":null,"min":0,"max":2200}];
		return data;
	},
	randomSource: function (steps) {
		var wavetypes = ['sine', 'square', 'sawtooth', 'triangle'];

		var data = [{
			type:wavetypes[Math.floor(Math.random()*wavetypes.length)],
			newObj: true
		}];
		return data;
	},
	getData: function (groupId, userId, cb) {
		
		Group.findById(groupId, function (err, group) {
			User.findById(userId, function (err, user) {
				cb({group:group, user:user})
			})
		})
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
