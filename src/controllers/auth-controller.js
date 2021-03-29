const jwt = require('jsonwebtoken');

/**
 * Auth user with username and password
 *
 * @param {e.Request} request - The request
 * @param {Object} request.user - The user in request
 * @param {e.Response} response - The Response
 */
module.exports.login = async (request, response) => {
  try {
    const {user} = request;

    const token = await jwt.sign(user.toJSON(), request.app.get('key'));

    response.json({user, token});
  } catch (e) {
    console.error(e);

    response
      .status(400)
      .json({ message: e.toString() });
  }
}
