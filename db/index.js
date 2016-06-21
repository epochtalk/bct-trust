var path = require('path');

module.exports = {
  addTrustFeedback: require(path.normalize(__dirname + '/addTrustFeedback')),
  trustSources: require(path.normalize(__dirname + '/trustSources')),
  editTrustList: require(path.normalize(__dirname + '/editTrustList')),
  getTrustList: require(path.normalize(__dirname + '/getTrustList')),
};
