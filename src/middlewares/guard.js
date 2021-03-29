const jwt = require('jsonwebtoken');

/**
 * Admin validator middleware
 *
 * @param {e.Request} request - The Request
 * @param {Object} [request.user=null] - The User in response
 * @param {e.Response} response - The Response
 * @param {Function} next - Trigger next route
 */
module.exports.isAdmin = (request, response, next) => {
  // Get user in request or default non loged user
  const {isAdmin} = request.user || { isAdmin: false };

  if(isAdmin) {
    next()
  } else {
    response
      .status(401)
      .json({message: 'Unauthorized', code: 'AUTH-00003'});
  }
}

/**
 * Admin validator middleware
 *
 * @param {e.Request} request - The Request
 * @param {Object} [request.user=null] - The User in response
 * @param {e.Response} response - The Response
 * @param {Function} next - Trigger next route
 */
module.exports.isLoggedIn = async (request, response, next) => {
  // If user in request then you're logged in

  const token = request.header('Authorization');

  if (!token) {
    return response
      .status(403)
      .json({message: 'No token in request is present', code: 'AUTH-00002'});
  }

  try {
    request.user = await jwt.verify(token, request.app.get('key'));

    next()
  } catch(e) {
    return response
      .status(400)
      .json({ message: 'Invalid token' });
  }
}
