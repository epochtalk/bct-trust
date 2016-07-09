var resource = ['$resource',
  function($resource) {
    return $resource('/api/trust', {}, {
      addTrustFeedback: {
        method: 'POST'
      },
      getTrustList: {
        method: 'GET',
        url: '/api/trust/list'
      },
      editTrustList: {
        method: 'POST',
        url: '/api/trust/list'
      },
      getTrustTree: {
        method: 'GET',
        url: '/api/trust/tree',
        isArray: true
      },
      getTrustStats: {
        method: 'GET',
        url: '/api/trust/:username',
        params: { username: '@username' }
      },
      getTrustFeedback: {
        method: 'GET',
        url: '/api/trust/:username/feedback',
        params: { username: '@username' }
      }
    });
  }
];

angular.module('ept').factory('UserTrust', resource);
