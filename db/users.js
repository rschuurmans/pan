var fs      = require('fs');

// exports.createUser = function (username, password) {
//   var records = JSON.parse(fs.readFileSync('public/data/users.json', 'utf8'));
//   // id has to be dynamic
//   records.push({
//     id:3,
//     username: username,
//     password: password
//   })
//   fs.writeFileSync('public/data/users.json', JSON.stringify(records, null, 2));
// }

// exports.hasgroup =  function (username, cb) {
//   console.log('hasgroup');
//   var records = JSON.parse(fs.readFileSync('public/data/users.json', 'utf8'));
//   process.nextTick(function() {
//     for (var i = 0, len = records.length; i < len; i++) {
//       var record = records[i];
//       if (record.username === username) {
//         if(record.group.length > 1) {
//           return cb(null, record)
//         }
//         return cb(null, null);
//       }
//     }
//     return cb(null, null);
//   });
// }
// exports.findById = function(id, cb) {
//   console.log('find by id');
//   var records = JSON.parse(fs.readFileSync('public/data/users.json', 'utf8'));
//   process.nextTick(function() {
//     var idx = id - 1;
//     if (records[idx]) {
//       cb(null, records[idx]);
//     } else {
//       cb(new Error('User ' + id + ' does not exist'));
//     }
//   });
// }

// exports.findByUsername = function(username, cb) {
//   console.log('findByUsername');
//   var records = JSON.parse(fs.readFileSync('public/data/users.json', 'utf8'));
//   console.log(records);
//   process.nextTick(function() {
//     for (var i = 0, len = records.length; i < len; i++) {
//       var record = records[i];
//       if (record.username === username) {
//         console.log('match');
//         return cb(null, record);
//       }
//     }
//     return cb(null, null);
//   });
// }
