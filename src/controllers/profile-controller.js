const {updateUser} = require(`./user-controller`);

/**
 * Get current user profile
 *
 * @param {e.Request} request - The Request
 * @param {Object} request.user - The user in request
 * @param {e.Response} response - The Response
 */
module.exports.getProfile = (request, response) => {
  response.json(request.user);
}

/**
 * Update current user profile
 *
 * @param {e.Request} request - The Request
 * @param {Object} request.user - The user in request
 * @param {e.Response} response - The Response
 */
module.exports.updateProfile = async (request, response) => {
  const {id} = request.user;
  request.params.id = id;
  await updateUser(request, response);
}
