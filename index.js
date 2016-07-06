var path = require('path');
var db = require(path.normalize(__dirname + '/db'));
var hooks = require(path.normalize(__dirname + '/hooks'));
var routes = require(path.normalize(__dirname + '/routes'));
//var permissions = require(path.normalize(__dirname + '/permissions'));

module.exports =  {
  name: 'userTrust',
//  permissions: permissions,
  routes: routes,
  hooks: hooks,
  db: db
};
