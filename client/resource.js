var resource = ['$resource',
  function($resource) {
    return $resource('/api/trust', {}, {
      addTrustFeedback: {
        method: 'POST'
      },
      getTrustList: {
        method: 'GET',
        url: '/api/trust/:username/list',
        params: { username: '@username' },
        isArray: true
      }
    });
  }
];

angular.module('ept').factory('UserTrust', resource);
