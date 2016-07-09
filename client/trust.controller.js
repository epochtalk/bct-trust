var ctrl = ['$anchorScroll', '$timeout', 'Session', 'Alert', 'UserTrust', 'user', 'feedback', function($anchorScroll, $timeout, Session, Alert, UserTrust, user, feedback) {
    var ctrl = this;
    this.user = user;
    this.userFeedback = feedback;
    this.settingsUsername = Session.user.username;
    this.loggedIn = Session.isAuthenticated;

    this.feedback = {
      user_id: user.id,
      risked_btc: 0.0000,
      scammer: undefined,
      reference: undefined,
      comments: undefined
    };

    this.urlValid = function() {
      return !ctrl.feedback.reference || (ctrl.feedback.reference && /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(ctrl.feedback.reference));
    };

    this.showFeedbackModal = false;
    this.feedbackSubmitted = false;
    this.submitFeedbackBtnLabel = 'Leave Feedback';

    this.addTrustFeedback = function() {
      ctrl.feedbackSubmitted = true;
      ctrl.submitFeedbackBtnLabel = 'Loading...';
      if (ctrl.feedback.scammer === -1) { ctrl.feedback.scammer = null; }
      UserTrust.addTrustFeedback(ctrl.feedback).$promise
      .then(function() {
        Alert.success('Successfully left feedback for user ' + user.username);
      })
      .catch(function() {
        Alert.error('There was an error leaving feedback for user ' + user.username);
      })
      .finally(function() {
        ctrl.feedbackSubmitted = false;
        ctrl.submitFeedbackBtnLabel = 'Leave Feedback';
        ctrl.closeFeedback();
      });
    };

    this.closeFeedback = function() {
      ctrl.feedback.risked_btc = 0.0000;
      ctrl.feedback.scammer = undefined;
      ctrl.feedback.reference = undefined;
      ctrl.feedback.comments = undefined;

      $timeout(function() {
        ctrl.showFeedbackModal = false;
      });
    };

  }
];

module.exports = angular.module('bct.trust.ctrl', [])
.controller('TrustCtrl', ctrl)
.name;
