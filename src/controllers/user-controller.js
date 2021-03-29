const User = require('../models/user');

/**
 * List all users by filters
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.listUsers = async (request, response) => {
  const users = await User.findAll();

  response.json(users);
}

/**
 * Create new user
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.createUser = async (request, response) => {
  const user = await User.create(request.body);

  response.status(201).json(user);
}

/**
 * Get user by pk
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.getUserById = async (request, response) => {
  try {
    const {id} = request.params;

    const user = await User.findOne({where: {id}});
    
    response.json(user);
  }catch(e) {
    response.status(500).send(e.toString());
  }
}

/**
 * Update user by pk
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.updateUser = async (request, response) => {
  if (request.params.id) {
    response.json({});
  } else {
    response.status(204).send();
  }
}

/**
 * Replace user entity by id
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.setUser = async (request, response) => {
  if (request.params.id) {
    response.json({});
  } else {
    response.status(204).send();
  }
}

/**
 * Delete user by pk
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.deleteUser = async (request, response) => {
  try {
    const {id} = request.params;

    await User.where({id}).delete();
    
    response.json(204);
  }catch(e) {
    response.status(500).send(e);
  }
}
