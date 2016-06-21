var path = require('path');
var dbc = require(path.normalize(__dirname + '/db'));
var db = dbc.db;
var helper = dbc.helper;

module.exports = function(opts) {
  var userId = helper.deslugify(opts.userId);
  var existsQuery = 'SELECT EXISTS (SELECT user_id_trusted FROM trust  WHERE user_id = $1)';
  return db.scalar(existsQuery, [userId])
  .then(function(exists) {
    var q = 'SELECT user_id_trusted, (SELECT username FROM users WHERE id = user_id_trusted) as username_trusted, type FROM trust WHERE user_id = $1 ORDER BY type';
    var defaultTrustId = '537d639c-3b50-4545-bea1-8b38accf408e';
    // User has trust network
    if (exists) {
      return db.sqlQuery(q, [userId])
      .then(function(trustArr) {
        return db.scalar(q, [defaultTrustId])
        .then(function(defaultTrust) {
          trustArr.unshift(defaultTrust);
        });
      });
    }
    // user has no trust network default to defaulttrustacct
    if (!exists) { return db.scalar(q, [defaultTrustId]); }
  })
  .then(helper.slugify);
};
