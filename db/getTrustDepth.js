var path = require('path');
var dbc = require(path.normalize(__dirname + '/db'));
var db = dbc.db;
var trustSources = require(path.normalize(__dirname + '/trustSources'));
var helper = dbc.helper;
var Promise = require('bluebird');

module.exports = function(userId) {
  var debug = [];
  var maxDepth = 2;

  return trustSources(userId, maxDepth, debug)
  .then(function() {
    var depth = 0;
    return Promise.map(debug, function(level) {
      return Promise.map(level, function(userInfo) {
        return db.scalar('SELECT id, username FROM users WHERE id = $1', [userInfo[0]])
        .then(function(user) {
          user.level_trust = userInfo[1];
          return user;
        });
      });
    })
    .map(function(users) {
      return {
        depth: depth++,
        users: helper.slugify(users)
      };
    });
  });
};
