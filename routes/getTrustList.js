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
  path: '/api/trust/list',
  config: { auth: { strategy: 'jwt' } },
  handler: function(request, reply) {
    var promise = request.db.userTrust.getTrustList(request.auth.credentials.id);
    return reply(promise);
  }
};
