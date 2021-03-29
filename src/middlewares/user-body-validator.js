const User = require('../models/user');

/**
 * User validator middleware
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 * @param {Function} next - Trigger next route
 */
module.exports = async (request, response, next) => {
  const { body } = request;

  if (Object.keys(body).length === 0) {
    return response.status(400).json({
      message: 'Invalid request body'
    })
  }

  // Validating password
  const {password} = body;

  if (!password || password.length < 8) {
    return response.status(400).json({
      password: ['Field must have al least 8 characters']
    });
  }

  // Validating name
  const {name} = body;
  if (!name) {
    return response.status(400).json({
      password: ['Field must exists']
    });
  }

  // Validating email
  const {email} = body;
  if (!email) {
    return response.status(400).json({
      password: ['Field must exists']
    });
  } else if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    return response.status(400).json({
      password: ['Is not a valid email']
    });
  } else {
    const duplicated = await User.count({where: {email}});

    if (duplicated > 0) {
      return response.status(400).json({
        username: [`${email} is already taken`]
      });
    }
  }

  // Validating username
  const {username} = body;

  if (!username || username.length < 5) {
    return response.status(400).json({
      username: ['Field must have al least 5 characters']
    });
  } else {
    const duplicated = await User.count({where: {username}});

    if (duplicated > 0) {
      return response.status(400).json({
        username: [`${username} is already taken`]
      });
    }
  }

  next();
}
