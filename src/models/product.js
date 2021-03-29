const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

class Products extends Model {}

Products.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    picture: DataTypes.BLOB
}, { sequelize, modelName: 'products' });


module.exports = Products;
