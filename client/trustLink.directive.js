var html = '<div class="profile-row centered-text"><a ui-sref="trust-settings">Edit Trust Settings</a></div>';

var directive = [function() {
  return {
    restrict: 'E',
    template: html
  };
}];


angular.module('ept').directive('trustLink', directive);
