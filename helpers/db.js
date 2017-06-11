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
		Group.findById(groupId, function (err, group) {
			if(err) throw err;
			group = newGroup;
			group[roleLeaving] = null;
			console.log(group);
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
			groupId: group._id
		})
		user.save( function () {
			cb(user)
		});
	},
	
	createGroup: function (cb) {
		db.countGroups(function (count) {
			var audioData = audioSetup.generate();
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
				scale: audioSetup.scale,
				effects     : false,
				adsr        : audioData.adsr,
				sustain        : audioData.sustain,
				wavetypes   : audioData.wavetypes,
				synth       : audioData.synth
			})
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
				cb({group:group, user:user})
			})
		})
	},
}

module.exports = db;
