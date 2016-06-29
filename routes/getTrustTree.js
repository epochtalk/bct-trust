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
  method: 'GET',
  path: '/api/trust/tree',
  config: {
    auth: { strategy: 'jwt' },
    validate: { query: { hierarchy: Joi.boolean() } }
  },
  handler: function(request, reply) {
    var userId = request.auth.credentials.id;
    var promise;
    if (request.query.hierarchy) { promise = request.db.userTrust.getTrustHierarchy(userId, 2); }
    else { promise = request.db.userTrust.getTrustDepth(userId); }
    return reply(promise);
  }
};
