const router = require('express').Router();
const AuthController = require('../controllers/auth-controller');
const UserController = require('../controllers/user-controller');
const authValidator = require('../middlewares/login-body-validator');

router
  .post('/login', [authValidator], AuthController.login)
  .post('/register', UserController.createUser)

module.exports = router
