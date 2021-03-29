const Order = require('../models/orders');

/**
 * List all Orders by filters
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.listOrders = async (request, response) => {
    const Orders = await Order.findAll();
    response.json(Orders);
}

/**
 * Create new Order
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.createOrder = async (request, response) => {
    const Order = await Order.create(request.body);

    response.status(201).json(Order);
}

/**
 * Get Order by pk
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.getOrderById = async (request, response) => {
    const Order = await Order.findByPk(request.params.id);

    if (Order) {
        response.status(201).json(Order);
    } else {
        response.status(204).send();
    }
}

/**
 * Delete Order by pk
 *
 * @param {e.Request} request - The Request
 * @param {e.Response} response - The Response
 */
module.exports.cancelOrder = (request, response) => {
    if (request.params.id) {
        response.json({});
    } else {
        response.status(204).send();
    }
}
