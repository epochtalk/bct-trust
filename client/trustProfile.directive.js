var html = '<hr><div><span><strong>Trust:</strong>&nbsp;&nbsp;<span class="trust-score" ng-class="vm.getStyle(vm.stats.score)"><span data-balloon="Trust Score">{{vm.stats.score}}</span> : <span data-balloon="Negative Feedback" ng-class="{\'neg\' : vm.stats.neg !== 0 }">-{{vm.stats.neg}}</span> / <span data-balloon="Positive Feedback">+{{vm.stats.pos}}</span></span></span></div>';
html += '<div ng-if="vm.stats.score < 0"><span class="trust-score" ng-class="vm.getStyle(vm.stats.score)">Warning: Trade with extreme caution!</span></div>';
html += '<div><span><a ui-sref="trust({ username: vm.username })">View Trust Feedback</a></span></div>';

var directive = ['UserTrust', function(UserTrust) {
  return {
    restrict: 'E',
    scope: true,
    bindToController: { username: '=' },
    template: html,
    controllerAs: 'vm',
    controller: ['$scope', function($scope) {
      var ctrl = this;
      this.stats = null;

      // Watch for username change
      $scope.$watch(function() { return ctrl.username; }, function(val) {
        if (val) {
          UserTrust.getTrustStats({ username: val }).$promise
          .then(function(stats) {
            ctrl.stats = stats;
          });
        }
      });

      this.getStyle = function(score) {
        if (score === '???') { return 'unknown'; }
        else {
          if (score < 0) { return 'low'; }
          if (score > 4) { return 'mid'; }
          if (score > 14) { return 'high'; }
        }
      };

    }]
  };
}];


angular.module('ept').directive('trustProfile', directive);
