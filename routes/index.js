var path = require('path');

module.exports = [
  require(path.normalize(__dirname + '/addTrustFeedback')),
  require(path.normalize(__dirname + '/trustSources')),
  require(path.normalize(__dirname + '/getTrustList'))
];