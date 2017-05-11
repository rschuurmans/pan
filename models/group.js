// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
// var groupSchema = new Schema({
//   number: {type: Number, unique: true} ,
//   users: Array,
//   demo: Boolean,
//   master: String
// });

// var groupSchema = new Schema({
// 	activeSounds : Array,
// 	users: Array,
// 	timestamp: Date,
// 	demo: Boolean
// })
var groupSchema = new Schema({
	steps: Array,
	sources: Array,
	modulate: Array,
	timestamp: Date,
	sequencer: Object,
	modulator: Object,
	groupCounter: Number,
	vca: Boolean
})




var Group = mongoose.model('Group', groupSchema);


module.exports = Group;


