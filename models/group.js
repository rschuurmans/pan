// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
	steps: Array,
	sources: Array,
	modulate: Array,
	timestamp: Date,
	sequencer: Object,
	modulator: Object,
	groupCounter: Number,
	vca: Boolean,
	effects: Boolean,
	pp: Array,
	adsr: Object,
	wavetypes: Array,
	synth:String,
	scale: Array,
	sustain: Boolean

})




var Group = mongoose.model('Group', groupSchema);


module.exports = Group;


