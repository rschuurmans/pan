var express = require('express');  
var app     = express();
var router  = express.Router();
var Group   = require('./../models/group');
var User    = require('./../models/user');
var db      = require('./../helpers/db');

router.get('/', function (req, res, next) {
  res.render('create/create');
})

router.post('/', function (req, res, next) {
  // session naar cookie

  db.joinGroup(req.body.groupnumber, req.cookies.deviceId, function (group) {
    if(group) {
      res.redirect('/create/newGroup/' + group.number)

    } else {
      res.render('create/create', {error: 'error!'})
    }
  })
})

router.post('/add', function (req, res, next) {
  // creating a new group;
  db.createGroup(req.cookies.deviceId, function (number) {
    res.redirect('/create/newGroup/' + number)
  })

})

router.get('/newGroup/:id', function (req, res, next) {
  db.groupByNumber(req.params.id, function (group) {
    
    res.render('create/newGroup', {
      group: group,
      username: group.users[group.users.length - 1].username
    })
  })
  
  
})

router.post('/newGroup/:id', function (req, res, next) {
  db.updateUsername(req.cookies.deviceId,req.params.id,req.body.username, function (group) {
      res.cookie('username', req.body.username);
      res.cookie('groupNumber', req.params.id)
      console.log('callback', group);
     res.redirect('/play')
     res.end();
  })
 
})

module.exports = router;  
