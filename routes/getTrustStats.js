var Joi = require('joi');
var Boom = require('boom');

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
  path: '/api/trust/{username}',
  config: {
    auth: { strategy: 'jwt' },
    validate: { params: { username: Joi.string().required() } }
  },
  handler: function(request, reply) {
    var promise = request.db.users.userByUsername(request.params.username)
    .catch(function() { return Boom.notFound(); })
    .then(function(user) {
      return request.db.userTrust.getTrustStats(user.id, request.auth.credentials.id);
    });
    return reply(promise);
  }
};
