var Joi = require('joi');

/**
  * @apiVersion 0.4.0
  * @apiGroup Trust
  * @api {POST} /trust Add Trust Feedback
  * @apiName AddTrustFeedback
  * @apiPermission User
  * @apiDescription Used to mark a user as watching a board.
  *
  * @apiError (Error 500) InternalServerError There was an issue adding feedback
  */
module.exports = {
  method: 'POST',
  path: '/api/trust',
  config: {
    auth: { strategy: 'jwt' },
    validate: {
      payload: {
        user_id: Joi.string().required(),
        risked_btc: Joi.number(),
        scammer: Joi.boolean().allow(null),
        reference: Joi.string().min(3).max(1024).optional(),
        comments: Joi.string().min(3).max(1024)
      }
    }
  },
  handler: function(request, reply) {
    var opts = {
      userId: request.payload.user_id,
      reporterId: request.auth.credentials.id,
      riskedBtc: request.payload.risked_btc,
      scammer: request.payload.scammer,
      reference: request.payload.reference,
      comments: request.payload.comments
    };
    var promise = request.db.userTrust.addTrustFeedback(opts);
    return reply(promise);
  }
};
