var Promise = require('bluebird');

function userTrust(request) {
  var authedUserId;
  if (request.auth.isAuthenticated) { authedUserId = request.auth.credentials.id; }

  return Promise.map(request.pre.processed.posts, function(post) {
    return request.db.userTrust.getTrustStats(post.user.id, authedUserId)
    .then(function(stats) {
      post.user.stats = stats;
      return post;
    });
  });
}

module.exports = [
  { path: 'posts.byThread.post', method: userTrust }
];
