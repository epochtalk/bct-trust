var html= '<a ui-sref="trust({ username: vm.user.username })"><span ng-if="vm.visible" class="trust-score {{vm.style()}}">{{vm.stats.score}} : <span class="{{vm.negStyle}}">-{{vm.stats.neg}}</span> / +{{vm.stats.pos}}</span></a>';

var directive = [function() {
  return {
    restrict: 'E',
    scope: true,
    bindToController: { user: '=', visible: '=' },
    template: html,
    controllerAs: 'vm',
    controller: [function() {
      var ctrl = this;
      this.stats = this.user.stats;

      this.style = function() {
        var stats = ctrl.stats;
        if (stats.score === '???') { return 'unknown'; }
        else {
          if (stats.score < 0) { return 'low'; }
          if (stats.score > 4) { return 'mid'; }
          if (stats.score > 14) { return 'high'; }
        }
      };

      this.negStyle = this.user.stats.neg === 0 ? '' : 'neg';

    }]
  };
}];


angular.module('ept').directive('trustScore', directive);
