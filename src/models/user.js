const bcrypt = require("bcrypt");
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

/**
 * User model
 *
 * @property {number} id - The auto increment uniques id
 * @property {String} password - The hashed password
 * @property {Date} createdAt - The creation date
 * @property {Date} updatedAt - The last update date
 */
class User extends Model {
  static PROTECTED_ATTRIBUTES = [
    'password'
  ];

  /**
   * Validate user password
   *
   * @param {String} password - The hashed password to compare
   * @returns {boolean} true if hashed data matches hash
   */
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  /**
   * To JSON middleware
   *
   * @returns {User} User instance without protected attributes
   */
  toJSON () {
    // hide protected fields
    let attributes = Object.assign({}, this.get());
    for (let a of User.PROTECTED_ATTRIBUTES) {
      delete attributes[a]
    }

    return attributes
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isEmail: true
  },
  password: {
    type: DataTypes.STRING(64),
    is: /^[0-9a-f]{64}$/i
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  name: DataTypes.STRING,
  phone: DataTypes.INTEGER.UNSIGNED,
  address: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'users',
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: { attributes: { } }
  },
  hooks: {
    /**
     * Change plain text password with hashed one
     *
     * @param {User} user - The user instance
     */
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }
});

module.exports = User;
