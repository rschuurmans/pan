var User             = require('./../models/user');
var Group            = require('./../models/group');
var audioSetup       = require('./audio');
var mongoose         = require('mongoose');

var db = {
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
	deleteEmptyGroups: function (callback) {
		console.log('delete?');
		Group.remove({modulator: null, sequencer: null},function (err, groups) {
			if(err) throw err;
			console.log('i deleted some', groups);
			callback();
		})


	},
	
	joinGroup: function (username, groupId, cb) {
		Group.findById(groupId, function (err, group) {
			if(err) throw err;
			db.createUser(username, group, function (user) {
				if(err) throw err;
				db.updateRole(user, group, function (user, group) {
					if(err) throw err;
					cb(user, group);
				})
			})
		})
	},
	getAllGroups: function (cb) {
		db.deleteEmptyGroups(function () {

		Group.find(function(err, groups) {
			if(err) throw err;

			cb(groups)
		})
		})
	},
	countGroups: function (cb) {
		Group.find().count(function (err, count) {
			cb(count)
		})
	},
	updateGroup: function (groupId, newGroup, cb) {
		Group.findById(groupId, function (err, group) {
			if(err) throw err;
			group = newGroup;
			group.save(function (group) {
				cb(group)
			})

		})
	},
	updateRole: function (user, group, cb) {
		if(group.sequencer == null) {
			user.role       = 'sequencer';
			group.sequencer = user;
		} else {
			user.role       = 'modulator';
			group.modulator = user;
		}
		user.save(function () {
			group.save(function () {
				cb(user, group);
			})
		})
	},
	leaveGroup: function (groupId, roleLeaving, newGroup, cb) {
		console.log('leaveGroup in db.js');
		Group.findById(groupId, function (err, group) {
			if(err) throw err;
			
			
			
			group.sustain      = newGroup.sustain;
			group[roleLeaving] = null;

			
			group.save(function (group) {
				cb(group)
			})

		})
	},
	createUser:function (username, group, cb) {
		var user = new User({
			username: username,
			active:true,
			startDate: new Date(),
			role: 'none',
			groupId: group._id,
			color: group.color
		})
		user.save( function () {
			cb(user)
		});
	},
	getColor: function () {
		return Math.floor(Math.random() * 5) + 1 ; 

	},
	createGroup: function (cb) {
		db.countGroups(function (count) {
			var audioData = audioSetup.generate(count);
			group = new Group({
				steps       : audioData.steps,
				pp          : audioSetup.scale,
				sources     : audioData.sources,
				modulate    : audioData.filters,
				timestamp   : new Date(),
				sequencer   : null,
				modulator   : null,
				groupCounter: count,
				vca         : false,
				scale       : audioSetup.scale,
				effects     : false,
				adsr        : audioData.adsr,
				sustain     : audioData.sustain,
				wavetypes   : audioData.wavetypes,
				synth       : audioData.synth,
				color       : db.getColor(),
			})
			console.log(group.color);
			group.save(function (err, group) {
				if(err) throw err;
				console.log('saved a group');
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
	getData: function (groupId, userId, cb) {
		
			Group.findById(groupId, function (err, group) {
				User.findById(userId, function (err, user) {

					cb(group, user)
				})
			})
		
	},
}

module.exports = db;
