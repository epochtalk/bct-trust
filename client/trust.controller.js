var ctrl = ['$anchorScroll', '$timeout', 'Session', 'Alert', 'UserTrust', 'user',
  function($anchorScroll, $timeout, Session, Alert, UserTrust, user) {
    var ctrl = this;
    this.user = user;
    this.settingsUsername = Session.user.username;

    this.feedback = {
      user_id: user.id,
      risked_btc: 0.0000,
      scammer: undefined,
      reference: undefined,
      comments: undefined
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
