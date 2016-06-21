var path = require('path');
var dbc = require(path.normalize(__dirname + '/db'));
var db = dbc.db;
var helper = dbc.helper;

module.exports = function(userId) {
  userId = helper.deslugify(userId);
  var existsQuery = 'SELECT EXISTS (SELECT user_id_trusted FROM trust WHERE user_id = $1)';
  return db.scalar(existsQuery, [userId])
  .then(function(row) {
    var exists = row.exists;
    var defaultTrustId = '537d639c-3b50-4545-bea1-8b38accf408e';
    var q = 'SELECT user_id_trusted, (SELECT username FROM users WHERE id = user_id_trusted) as username_trusted, type FROM trust WHERE user_id = $1 ORDER BY type, user_id_trusted';
    var defaultTrustQuery = 'SELECT id as user_id_trusted, username as username_trusted, 0 as type FROM users WHERE id = $1';
    // User has trust network
    if (exists) {
      return db.sqlQuery(q, [userId])
      .then(function(trustArr) {
        // Default Trust might be untrusted
        var defaultTrustExists = false;
        for (var i = 0; i < trustArr.length; i++) {
          if (trustArr[0].user_id_trusted === defaultTrustId) {
            defaultTrustExists = true;
            break;
          }
        }
        if (defaultTrustExists) { return trustArr; }
        else {
          return db.scalar(defaultTrustQuery, [defaultTrustId])
          .then(function(defaultTrust) {
            trustArr.unshift(defaultTrust);
            return trustArr;
          });
        }
      });
    }
    // user has no trust network default to defaulttrustacct
    if (!exists) { return db.sqlQuery(defaultTrustQuery, [defaultTrustId]); }
  })
  .then(helper.slugify);
};
