const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

class Orders extends Model {}

Orders.init({
    status: DataTypes.STRING,
    hour: DataTypes.DATE,
    number: DataTypes.INTEGER,
    payment: DataTypes.INTEGER,
    user: DataTypes.BIGINT,
    address: DataTypes.STRING
}, { sequelize, modelName: 'orders' });


module.exports = Orders;
