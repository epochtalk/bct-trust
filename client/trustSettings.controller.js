var ctrl = ['$anchorScroll', '$timeout', '$location', 'Session', 'Alert', 'UserTrust', 'user', 'trustLists', 'trustTree', function($anchorScroll, $timeout, $location, Session, Alert, UserTrust, user, trustLists, trustTree) {
    var ctrl = this;
    this.user = user;
    this.userToTrust = {};
    this.trustList = trustLists.trustList;
    this.untrustList = trustLists.untrustList;
    this.trustTree = trustTree;
    this.hierarchy = $location.search().hierarchy;

    this.addToTrustList = function() {
      if (!ctrl.userToTrust.user_id_trusted || !ctrl.userToTrust.username_trusted) { return; }
      ctrl.untrustList = ctrl.untrustList.filter(function(u) {
        return u.user_id_trusted !== ctrl.userToTrust.user_id_trusted;
      });
      ctrl.userToTrust.type = 0;
      ctrl.trustList.push(ctrl.userToTrust);
      ctrl.userToTrust = {};
    };

    this.addToUntrustList = function() {
      if (!ctrl.userToTrust.user_id_trusted || !ctrl.userToTrust.username_trusted) { return; }
      ctrl.trustList = ctrl.trustList.filter(function(u) {
        return u.user_id_trusted !== ctrl.userToTrust.user_id_trusted;
      });
      ctrl.userToTrust.type = 1;
      ctrl.untrustList.push(ctrl.userToTrust);
      ctrl.userToTrust = {};
    };

    this.removeSelectedTrust = function() {
      ctrl.trustList = ctrl.trustList.filter(function(user) {
        return ctrl.selectedTrustedUsers.filter(function(u) {
          return u.user_id_trusted === user.user_id_trusted;
        }).length === 0;
      });
    };

    this.removeSelectedUntrust = function() {
      ctrl.untrustList = ctrl.untrustList.filter(function(user) {
        return ctrl.selectedUntrustedUsers.filter(function(u) {
          return u.user_id_trusted === user.user_id_trusted;
        }).length === 0;
      });
    };

    this.trustedUserExists = function() {
      return !!ctrl.trustList.find(u => u.user_id_trusted === ctrl.userToTrust.user_id_trusted);
    };

    this.untrustedUserExists = function() {
      return !!ctrl.untrustList.find(u => u.user_id_trusted === ctrl.userToTrust.user_id_trusted);
    };

    this.editTrustList = function() {
      var trustArr = ctrl.trustList.concat(ctrl.untrustList);
      UserTrust.editTrustList(trustArr).$promise
      .then(function(updatedLists) {
        ctrl.trustList = updatedLists.trustList;
        ctrl.untrustList = updatedLists.untrustList;
        return UserTrust.getTrustTree({ hierarchy: ctrl.hierarchy }).$promise;
       })
      .then(function(updatedTree) { ctrl.trustTree = updatedTree; });
    };

    this.changeTrustView = function() {
      ctrl.hierarchy = !ctrl.hierarchy;
      $location.search('hierarchy', ctrl.hierarchy ? 'true' : undefined);
      return UserTrust.getTrustTree({ hierarchy: ctrl.hierarchy }).$promise
      .then(function(updatedTree) { ctrl.trustTree = updatedTree; });
    };

  }
];

require('../../components/autocomplete_user_id/autocomplete-user-id.directive');

module.exports = angular.module('bct.trustSettings.ctrl', [])
.controller('TrustSettingsCtrl', ctrl)
.name;
