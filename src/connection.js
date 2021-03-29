const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-5',
    }
});

sequelize
  .sync()
  .then(r => console.log('Db synced'))
  .catch(e => {
      console.error('Error connecting to DB', e);
      process.exit(1);
  })

module.exports = {
    sequelize,
    Sequelize
}
