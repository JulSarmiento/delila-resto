const User = require('../models/user');

/**
 * Auth validator middleware
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 * @param {Object} [request.user=null] - The user in request
 * @param {Function} next - Trigger next route
 */
module.exports = async (request, response, next) => {
  const {username, password} = request.body;

  if (!username || !password) {
    return response
      .status(400)
      .json({
        message: 'username and password field must be present on request'
      })
  }

  /** @type User */
  const user = await User.scope('withPassword').findOne({where: {username}});

  if (!user || !user.validPassword(password)) {
    return response
      .status(400)
      .json({
        message: 'invalid username or password'
      })
  }

  request.user = user;
  next()
}
