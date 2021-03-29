const router = require('express').Router();

// Controllers
const UserController = require('../controllers/user-controller');
const ProfileController = require('../controllers/profile-controller');
const ProductController = require('../controllers/product-controller');
const OrderController = require('../controllers/orders-controller');

// Middlewares
const userValidator = require('../middlewares/user-body-validator');
const productValidator = require('../middlewares/product-body-validator');
const {isAdmin, isLoggedIn} = require('../middlewares/guard');

// Profile router
router
  .route('/profile')
  .all(isLoggedIn)
  .get(ProfileController.getProfile)
  .patch(ProfileController.updateProfile);

// Users router
router.route('/users')
  .get([isLoggedIn, isAdmin], UserController.listUsers)
  .post([userValidator, isLoggedIn], UserController.createUser);

router.route('/users/:id')
  .all(isLoggedIn, isAdmin) // Middlewares
  .get(UserController.getUserById)
  .put([userValidator], UserController.setUser)
  .patch([userValidator], UserController.updateUser)
  .delete(UserController.deleteUser);


// Products router
router.route('/products')
  .get([isLoggedIn], ProductController.listProducts)
  .post([isLoggedIn, isAdmin, productValidator], ProductController.createProduct)

router.route('/products/:id')
  .all(isLoggedIn, isAdmin)
  .get(ProductController.getProductById)
  .put([productValidator], ProductController.setProduct)
  .patch(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);

// Orders router
router.route('/orders')
    .get([isLoggedIn], ProductController.listProducts)
    .post([isLoggedIn, isAdmin, productValidator], ProductController.createProduct)

router.route('/orders/:id')
    .all(isLoggedIn, isAdmin)
    .get(OrderController.getOrderById)
    .delete(OrderController.cancelOrder);

module.exports = router;
