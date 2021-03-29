const Product = require('../models/product');

/**
 * List all Products by filters
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.listProducts = async (request, response) => {
  const products = await Product.findAll();
  response.json(products);
}

/**
 * Create new Product
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.createProduct = async (request, response) => {
  const product = await Product.create(request.body);

  response.status(201).json(product);
}

/**
 * Get Product by pk
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.getProductById = async (request, response) => {
  const product = await Product.findByPk(request.params.id);

  if (product) {
    response.status(201).json(product);
  } else {
    response.status(204).send();
  }
}

/**
 * Update Product by pk
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.updateProduct = (request, response) => {
  if (request.params.id) {
    response.json({});
  } else {
    response.status(204).send();
  }
}

/**
 * Update Product by pk
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.setProduct = (request, response) => {
  if (request.params.id) {
    response.json({});
  } else {
    response.status(204).send();
  }
}

/**
 * Delete Product by pk
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.deleteProduct = (request, response) => {
  if (request.params.id) {
    response.json({});
  } else {
    response.status(204).send();
  }
}
