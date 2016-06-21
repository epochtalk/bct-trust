var route = ['$stateProvider', function($stateProvider) {
  $stateProvider.state('trust', {
    parent: 'public-layout',
    url: '/profiles/{username}/trust',
    reloadOnSearch: false,
    views: {
      'content': {
        controller: 'TrustCtrl',
        controllerAs: 'TrustCtrl',
        templateUrl: '/static/templates/modules/bct-trust/trust.html'
      }
    },
    resolve: {
      $title: [ function() { return 'Trust'; } ],
      loadCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();
        require.ensure([], function() {
          var ctrl = require('./trust.controller');
          $ocLazyLoad.load({ name: 'bct.trust.ctrl' });
          deferred.resolve(ctrl);
        });
        return deferred.promise;
      }],
      user: ['User', '$stateParams', function(User, $stateParams) {
        return User.get({ id: $stateParams.username }).$promise
        .then(function(user) { return user; });
      }]
    }
  });

  $stateProvider.state('trust-settings', {
    parent: 'public-layout',
    url: '/settings/trust',
    reloadOnSearch: false,
    views: {
      'content': {
        controller: 'TrustSettingsCtrl',
        controllerAs: 'TrustSettingsCtrl',
        templateUrl: '/static/templates/modules/bct-trust/trustSettings.html'
      }
    },
    resolve: {
      $title: [ function() { return 'Trust Settings'; } ],
      loadCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();
        require.ensure([], function() {
          var ctrl = require('./trustSettings.controller');
          $ocLazyLoad.load([
            { name: 'bct.trustSettings.ctrl' },
            { name: 'ept.directives.autocomplete-user-id' }
          ]);
          deferred.resolve(ctrl);
        });
        return deferred.promise;
      }],
      user: ['User', 'Session', function(User, Session) {
        return User.get({ id: Session.user.username }).$promise
        .then(function(user) { return user; });
      }],
      trustLists: ['UserTrust', 'Session', function(UserTrust, Session) {
        return UserTrust.getTrustList({ username: Session.user.username }).$promise
        .then(function(list) {
          return {
            trustList: list.filter(function(e) { return e.type === 0; }),
            untrustList: list.filter(function(e) { return e.type === 1; })
          };
        });
      }]
    }
  });
}];

module.exports = angular.module('bct.trust', ['ui.router'])
.config(route)
.name;
