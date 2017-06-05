var User             = require('./../models/user');
var Group            = require('./../models/group');
var mongoose         = require('mongoose');

var CMajor = [261.63, 293.66	, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

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
						var adsr = db.randomADSR();
						var wavetypes = db.getwavetypes();
						var synth = db.getSynth();
					group = new Group({
						steps: melody,
						sources: source,
						modulate: sound,
						timestamp: new Date(),
						sequencer: null,
						modulator: null,
						groupCounter: count,
						vca: false,
						effects: false,
						adsr: adsr,
						wavetypes:wavetypes,
						synth:synth
					})
					group.save(function () {
						cb(group);
					})
				})
			}
		})
	},
	getwavetypes: function () {
		var wavetypes = ['sine', 'square', 'sawtooth', 'triangle', 'noise'];
		return wavetypes;
	},
	getSynth: function () {
		var synth = {
			type: 'synth'
		}
		return synth;
	},
	randomADSR: function () {
		// random values
		var data = {
			atack : 0.005,
			decay: 0.1,
			release:1,
			sustain:0.3
		}
		
		return data
	},
	createGroup: function (cb) {
		db.countGroups(function (count) {
			var melody = db.randomSequenceValues();
			var source = db.randomSource(melody.length);
			var sound  = db.randomSound();
			var adsr = db.randomADSR();
			var synth = db.getSynth();
			var wavetypes = db.getwavetypes();
			group = new Group({
				steps       : melody,
				pp: CMajor,
				sources     : source,
				modulate    : sound,
				timestamp   : new Date(),
				sequencer   : null,
				modulator   : null,
				groupCounter: count,
				vca: false,
				effects: false,
				adsr: adsr,
				wavetypes:wavetypes,
				synth: synth
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


		var sound = [
			  {
			    type: "pingpong",
			    values: {
			      feedback: 0,
			      delayTime: 0,
			    },
			    setValue: "delayTime",
			    value: 0,
			    min: 0,
			    max: 300
			  },
			  {
			    type: "chorus",
			    values: {
			      feedback:0,
					delayTime: 0
			    },
			    setValue: "feedback",
			    value: 0,
			    min: 0,
			    max: 300
			  },
			  {
			    type: "tremelo",
			    values: {
			      frequency: 0,
			      depth: 0,
			    },
			    setValue: "depth",
			    value: 0,
			    min: 0,
			    max: 1
			  },
			  {
			    type: "wahwah",
			    values: {
					baseFrequency: 100,
					gain         : 0,
					q            : 0
			    },
			    setValue: "q",
			    value: 0,
			    min: 0,
			    max: 20
			  },
			  {
			    type: "distortion",
			    values: {
					distortion: 0.8,
					oversample : 'none'
			    },
			    setValue: "distortion",
			    value: 0.8,
			    min: 0,
			    max: 2
			  }
			]
		return sound;
	},
	randomSequenceValues: function () {
		var stepsChoices = [4, 8,16];

		var steps = stepsChoices[Math.floor(Math.random()*stepsChoices.length)];
		// var steps = 32;

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

		var data = [];
		for(var i = 0; i < 3; i++) {
			var active = i == 0? true : false;
			data.push({
				id: i,
				type:wavetypes[Math.floor(Math.random()*wavetypes.length)],
				newObj: true,
				active: active,
				detune:0
			})
		}

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


module.exports = db;
