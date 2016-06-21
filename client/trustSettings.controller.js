var ctrl = ['$anchorScroll', '$timeout', 'Session', 'Alert', 'UserTrust', 'user', 'trustLists',
  function($anchorScroll, $timeout, Session, Alert, UserTrust, user, trustLists) {
    var ctrl = this;
    this.user = user;
    this.userToTrust = {};
    this.trustList = trustLists.trustList;
    this.untrustList = trustLists.untrustList;

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

    this.trustedUserExists = function() {
      return !!ctrl.trustList.find(u => u.user_id_trusted === ctrl.userToTrust.user_id_trusted);
    };

    this.untrustedUserExists = function() {
      return !!ctrl.untrustList.find(u => u.user_id_trusted === ctrl.userToTrust.user_id_trusted);
    };
  }
];

require('../../components/autocomplete_user_id/autocomplete-user-id.directive');

module.exports = angular.module('bct.trustSettings.ctrl', [])
.controller('TrustSettingsCtrl', ctrl)
.name;
