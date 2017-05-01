// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var groupSchema = new Schema({
  number: {type: Number, unique: true} ,
  users: Array,
  demo: Boolean,
  master: String
});


// the schema is useless so far
// we need to create a model using it
var Group = mongoose.model('Group', groupSchema);

// make this available to our users in our Node applications

module.exports = Group;


