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
  path: '/api/trust/list',
  config: {
    auth: { strategy: 'jwt' },
    validate: {
      payload: Joi.array().items(Joi.object().keys({
        user_id_trusted: Joi.string().required(),
        username_trusted: Joi.string().required(),
        type: Joi.number().min(0).max(1).required()
      }))
    }
  },
  handler: function(request, reply) {
   var opts = {
      userId: request.auth.credentials.id,
      list: request.payload
    };
    var promise = request.db.userTrust.editTrustList(opts);
    return reply(promise);
  }
};
